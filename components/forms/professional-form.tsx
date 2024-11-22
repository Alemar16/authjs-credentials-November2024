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
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value?.length > 0
                        ? `${field.value.length} roles selected`
                        : "Select roles"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search roles..." className="h-9" />
                    <CommandEmpty>No role found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {Object.values(TechRole).map((role: TechRole) => (
                        <CommandItem
                          key={role}
                          onSelect={() => {
                            const current = field.value || []
                            const updated = current.includes(role)
                              ? current.filter((r) => r !== role)
                              : [...current, role]
                            field.onChange(updated)
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value?.includes(role)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {role.replace(/_/g, " ")}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <div className="flex flex-wrap gap-2 mt-2">
                {field.value?.map((role) => (
                  <Badge key={role} variant="secondary">
                    {role.replace(/_/g, " ")}
                  </Badge>
                ))}
              </div>
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
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value?.length > 0
                        ? `${field.value.length} languages selected`
                        : "Select languages"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search languages..." className="h-9" />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {Object.values(ProgrammingLanguage).map((lang: ProgrammingLanguage) => (
                        <CommandItem
                          key={lang}
                          onSelect={() => {
                            const current = field.value || []
                            const updated = current.includes(lang)
                              ? current.filter((l) => l !== lang)
                              : [...current, lang]
                            field.onChange(updated)
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value?.includes(lang)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {lang}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <div className="flex flex-wrap gap-2 mt-2">
                {field.value?.map((lang) => (
                  <Badge key={lang} variant="secondary">
                    {lang}
                  </Badge>
                ))}
              </div>
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
