import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalForm } from "@/components/forms/personal-info-form";
import { ProfessionalForm } from "@/components/forms/professional-form";
import { SecurityForm } from "@/components/forms/security-form";
import { ContactForm } from "@/components/forms/contact-form";
import { PreferencesForm } from "@/components/forms/preferences-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  UserCircle, 
  Briefcase, 
  Shield, 
  Mail,
  Settings 
} from "lucide-react";
import { getPersonalInfo } from "@/app/actions/profile/personal";
import { getProfessionalInfo } from "@/app/actions/profile/professional";
import { Separator } from "@/components/ui/separator";
import { Education, Experience, Skill } from "@prisma/client";
import { ProfessionalInfoSchema } from "@/lib/schemas/professional";
import { z } from "zod";

interface ProfilePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

type ProfessionalFormValues = z.infer<typeof ProfessionalInfoSchema>;

interface ProfessionalInfo {
  title: string | null;
  bio: string | null;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  languages: string[];
  certifications: string[];
}

export default async function ProfilePage({
  searchParams: searchParamsPromise,
}: ProfilePageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const [personalInfo, professionalInfo, searchParams] = await Promise.all([
    getPersonalInfo(),
    getProfessionalInfo(),
    searchParamsPromise,
  ]) as [any, ProfessionalInfo | null, { [key: string]: string | string[] | undefined }];

  // Transform null values to undefined for the personal form
  const transformedPersonalInfo = personalInfo ? {
    username: personalInfo.username || "",
    firstName: personalInfo.firstName || "",
    lastName: personalInfo.lastName || "",
    bio: personalInfo.bio || undefined,
    city: personalInfo.city || undefined,
    country: personalInfo.country || undefined,
    image: personalInfo.image || undefined,
    gender: personalInfo.gender || undefined,
  } : undefined;

  // Transform null values to undefined for the professional form
  const transformedProfessionalInfo: ProfessionalFormValues | undefined = professionalInfo ? {
    title: professionalInfo.title || "",
    bio: professionalInfo.bio || "",
    education: professionalInfo.education?.map(edu => ({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field || "",
      startDate: edu.startDate,
      endDate: edu.endDate,
      current: edu.current,
      description: edu.description || undefined,
    })) || undefined,
    experience: professionalInfo.experience?.map(exp => ({
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      description: exp.description || undefined,
    })) || undefined,
    skills: professionalInfo.skills?.map(skill => ({
      name: skill.name,
      level: skill.level as "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT",
      yearsOfExperience: skill.yearsOfExperience || undefined,
    })) || undefined,
    languages: professionalInfo.languages || undefined,
    certifications: professionalInfo.certifications || undefined,
  } : undefined;

  // Validar el tab de forma segura
  const validTabs = ["personal", "professional", "security", "contact", "preferences"] as const;
  const tabParam = typeof searchParams?.tab === 'string' ? searchParams.tab : 'personal';
  const tab = validTabs.includes(tabParam as any) ? tabParam : "personal";

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <Separator />
        <Tabs defaultValue={tab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-transparent h-auto p-0">
            <TabsTrigger
              value="personal"
              className="data-[state=active]:border-primary flex items-center gap-2 border-2 data-[state=active]:bg-accent"
            >
              <UserCircle className="h-4 w-4" />
              <span className="hidden md:inline">Personal</span>
            </TabsTrigger>

            <TabsTrigger
              value="professional"
              className="data-[state=active]:border-primary flex items-center gap-2 border-2 data-[state=active]:bg-accent"
            >
              <Briefcase className="h-4 w-4" />
              <span className="hidden md:inline">Professional</span>
            </TabsTrigger>

            <TabsTrigger
              value="security"
              className="data-[state=active]:border-primary flex items-center gap-2 border-2 data-[state=active]:bg-accent"
            >
              <Shield className="h-4 w-4" />
              <span className="hidden md:inline">Security</span>
            </TabsTrigger>

            <TabsTrigger
              value="contact"
              className="data-[state=active]:border-primary flex items-center gap-2 border-2 data-[state=active]:bg-accent"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden md:inline">Contact</span>
            </TabsTrigger>

            <TabsTrigger
              value="preferences"
              className="data-[state=active]:border-primary flex items-center gap-2 border-2 data-[state=active]:bg-accent"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">Preferences</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PersonalForm initialData={transformedPersonalInfo} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="professional" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
                <CardDescription>
                  Update your professional details and skills.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfessionalForm initialData={transformedProfessionalInfo} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your security preferences and account protection.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SecurityForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Update your contact details and social media profiles.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Preferences</CardTitle>
                <CardDescription>
                  Customize your experience and notification settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PreferencesForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
