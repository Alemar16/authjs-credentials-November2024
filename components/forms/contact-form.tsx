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

const socialUrlPattern = {
  github: /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/,
  linkedin: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
  facebook: /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]+\/?$/,
  instagram: /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/,
}

const contactSchema = z.object({
  phone: z.string().optional(),
  phoneCountry: z.string()
    .regex(/^\+\d{1,3}$/, "Invalid country code (e.g., +1, +44)")
    .optional(),
  githubUrl: z.string()
    .regex(socialUrlPattern.github, "Invalid GitHub URL")
    .optional()
    .or(z.literal("")),
  linkedinUrl: z.string()
    .regex(socialUrlPattern.linkedin, "Invalid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  facebookUrl: z.string()
    .regex(socialUrlPattern.facebook, "Invalid Facebook URL")
    .optional()
    .or(z.literal("")),
  instagramUrl: z.string()
    .regex(socialUrlPattern.instagram, "Invalid Instagram URL")
    .optional()
    .or(z.literal("")),
})

type ContactValues = z.infer<typeof contactSchema>

export function ContactForm() {
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      phone: "",
      phoneCountry: "",
      githubUrl: "",
      linkedinUrl: "",
      facebookUrl: "",
      instagramUrl: "",
    },
  })

  async function onSubmit(data: ContactValues) {
    try {
      // TODO: Implement API call to update contact info
      console.log(data)
    } catch (error) {
      console.error("Error updating contact info:", error)
    }
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

        <Button type="submit" className="w-full">
          Save Contact Information
        </Button>
      </form>
    </Form>
  )
}
