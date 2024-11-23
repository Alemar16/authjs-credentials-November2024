"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { TechRole, ProgrammingLanguage } from "@/types/enums"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ProfessionalInfoSchema } from "@/lib/schemas/professional"
import { useToast } from "@/components/ui/use-toast"
import { useTransition } from "react"
import { getProfessionalInfo, updateProfessionalInfo } from "@/app/actions/profile/professional"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ProfessionalValues = z.infer<typeof ProfessionalInfoSchema>

interface ProfessionalFormProps {
  initialData?: ProfessionalValues
}

export function ProfessionalForm({ initialData }: ProfessionalFormProps) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const form = useForm<ProfessionalValues>({
    resolver: zodResolver(ProfessionalInfoSchema),
    defaultValues: initialData || {
      title: "",
      bio: "",
      education: [],
      experience: [],
      skills: [],
      languages: [],
      certifications: [],
      primaryRoles: [],
      programmingLanguages: [],
      yearsOfExperience: 0,
      portfolioUrl: "",
    },
  })

  async function onSubmit(data: ProfessionalValues) {
    startTransition(async () => {
      try {
        const result = await updateProfessionalInfo(data)
        
        if (result.error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.error,
          })
          return
        }

        toast({
          title: "Success",
          description: "Professional information updated successfully",
        })
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong",
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Senior Software Engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional Bio</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Write a brief description about your professional background..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Write a brief description about your professional background and expertise.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="primaryRoles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Roles</FormLabel>
              <Select
                onValueChange={(value: TechRole) => {
                  const currentValues = field.value || [];
                  const valueExists = currentValues.includes(value);
                  
                  field.onChange(
                    valueExists
                      ? currentValues.filter((v) => v !== value)
                      : [...currentValues, value]
                  );
                }}
                value=""
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary roles">
                      {field.value?.length 
                        ? `${field.value.length} roles selected` 
                        : "Select roles"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(TechRole).map((role) => (
                    <SelectItem key={role} value={role}>
                      <div className="flex items-center gap-2">
                        <div 
                          className={cn(
                            "h-4 w-4 border rounded flex items-center justify-center",
                            field.value?.includes(role) 
                              ? "bg-primary border-primary" 
                              : "border-input"
                          )}
                        >
                          {field.value?.includes(role) && (
                            <CheckIcon className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                        {role.replace(/_/g, " ")}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select one or more roles that best describe your expertise
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="programmingLanguages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Programming Languages</FormLabel>
              <Select
                onValueChange={(value: ProgrammingLanguage) => {
                  const currentValues = field.value || [];
                  const valueExists = currentValues.includes(value);
                  
                  field.onChange(
                    valueExists
                      ? currentValues.filter((v) => v !== value)
                      : [...currentValues, value]
                  );
                }}
                value=""
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select programming languages">
                      {field.value?.length 
                        ? `${field.value.length} languages selected` 
                        : "Select languages"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(ProgrammingLanguage).map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      <div className="flex items-center gap-2">
                        <div 
                          className={cn(
                            "h-4 w-4 border rounded flex items-center justify-center",
                            field.value?.includes(lang) 
                              ? "bg-primary border-primary" 
                              : "border-input"
                          )}
                        >
                          {field.value?.includes(lang) && (
                            <CheckIcon className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                        {lang.replace(/_/g, " ")}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select one or more programming languages you are proficient in
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="yearsOfExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="portfolioUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://your-portfolio.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  )
}
