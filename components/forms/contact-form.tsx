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
import { useTransition, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ContactSchema } from "@/lib/schemas/contact"
import { updateContactInfo, getContactInfo } from "@/app/actions/profile/contact"

type ContactFormValues = z.infer<typeof ContactSchema>

export function ContactForm() {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      phone: "",
      phoneCountry: "",
      githubUrl: "",
      linkedinUrl: "",
      facebookUrl: "",
      instagramUrl: "",
    },
  })

  useEffect(() => {
    async function loadContactInfo() {
      const result = await getContactInfo();
      if (result.success && result.data) {
        form.reset({
          phone: result.data.phone ?? "",
          phoneCountry: result.data.phoneCountry ?? "",
          githubUrl: result.data.githubUrl ?? "",
          linkedinUrl: result.data.linkedinUrl ?? "",
          facebookUrl: result.data.facebookUrl ?? "",
          instagramUrl: result.data.instagramUrl ?? "",
        });
      }
    }
    loadContactInfo();
  }, [form]);

  async function onSubmit(data: ContactFormValues) {
    startTransition(async () => {
      try {
        console.log('Enviando datos:', data);
        
        const result = await updateContactInfo(data);
        
        if (result.success) {
          toast({
            title: "Success",
            description: "Contact information updated successfully",
          });
          
          // Recargar los datos después de guardar
          const updatedResult = await getContactInfo();
          if (updatedResult.success && updatedResult.data) {
            form.reset({
              phone: updatedResult.data.phone ?? "",
              phoneCountry: updatedResult.data.phoneCountry ?? "",
              githubUrl: updatedResult.data.githubUrl ?? "",
              linkedinUrl: updatedResult.data.linkedinUrl ?? "",
              facebookUrl: updatedResult.data.facebookUrl ?? "",
              instagramUrl: updatedResult.data.instagramUrl ?? "",
            });
          }
        } else {
          toast({
            title: "Error",
            description: result.error || "Something went wrong",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error en el formulario:', error);
        toast({
          title: "Error",
          description: "Failed to update contact information",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phoneCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country Code</FormLabel>
                <FormControl>
                  <Input placeholder="+1" {...field} />
                </FormControl>
                <FormDescription>
                  e.g., +1 for US, +44 for UK
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="123-456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Social Media Links</h3>
          
          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub Profile</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://github.com/username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn Profile</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/in/username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="facebookUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook Profile</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://facebook.com/username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instagramUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram Profile</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://instagram.com/username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Saving..." : "Save Contact Information"}
        </Button>
      </form>
    </Form>
  )
}
