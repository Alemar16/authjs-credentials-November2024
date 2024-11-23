"use client";

import { z } from "zod";
import { PersonalInfoSchema } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { Camera, Loader2 } from "lucide-react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updatePersonalInfo } from "@/app/actions/profile/personal";
import { useToast } from "@/components/ui/use-toast";

type PersonalInfoValues = z.infer<typeof PersonalInfoSchema>;

interface PersonalFormProps {
  initialData?: PersonalInfoValues;
}

export function PersonalForm({ initialData }: PersonalFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialData?.image);

  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: initialData || {
      username: "",
      firstName: "",
      lastName: "",
      bio: "",
      city: "",
      country: "",
      image: undefined,
      gender: undefined,
    },
  });

  async function onSubmit(data: PersonalInfoValues) {
    startTransition(async () => {
      try {
        const result = await updatePersonalInfo({
          ...data,
          image: imageUrl,
        });

        if (result.error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.error,
          });
          return;
        }

        toast({
          title: "Success",
          description: "Personal information updated successfully",
        });
        setIsAvatarModalOpen(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center space-y-4">
          <Dialog open={isAvatarModalOpen} onOpenChange={setIsAvatarModalOpen}>
            <DialogTrigger asChild>
              <div className="relative group">
                <Avatar className="w-24 h-24 cursor-pointer hover:opacity-90 transition-opacity">
                  {imageUrl ? (
                    <CldImage
                      src={imageUrl}
                      alt={form.getValues("firstName") || "Avatar"}
                      width={96}
                      height={96}
                      crop="thumb"
                      gravity="face"
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xl">
                      {form.getValues("firstName")?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  )}
                  <div className="absolute bottom-0 right-0 bg-background rounded-full p-1 shadow-sm">
                    <Camera className="w-4 h-4" />
                  </div>
                </Avatar>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Profile Picture</DialogTitle>
                <DialogDescription>
                  Choose a new avatar image. Supported formats: JPG, PNG, WebP (max 5MB)
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <CldUploadWidget
                  uploadPreset="ml_default"
                  onUpload={(result: any) => {
                    if (result.info) {
                      setImageUrl(result.info.public_id);
                    }
                  }}
                  options={{
                    maxFiles: 1,
                    maxFileSize: 5000000, // 5MB
                    resourceType: "image",
                    clientAllowedFormats: ["jpg", "png", "webp"],
                  }}
                >
                  {({ open }) => (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => open()}
                    >
                      Upload Image
                    </Button>
                  )}
                </CldUploadWidget>
                {imageUrl && (
                  <div className="flex justify-center">
                    <CldImage
                      src={imageUrl}
                      alt="Preview"
                      width={200}
                      height={200}
                      crop="thumb"
                      gravity="face"
                      className="rounded-lg"
                    />
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name. It can only contain letters, numbers and underscores.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                    <SelectItem value="PREFER_NOT_TO_SAY">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input placeholder="A little bit about yourself..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Your city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Your country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </Form>
  );
}
