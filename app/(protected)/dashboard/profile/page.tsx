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

interface PageProps {
  searchParams: {
    tab?: string;
  };
}

export default async function ProfilePage({ searchParams }: PageProps) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const personalInfo = await getPersonalInfo();

  // Validar el tab de forma segura
  const validTabs = ["personal", "professional", "security", "contact", "preferences"];
  const selectedTab = searchParams?.tab;
  const tab = validTabs.includes(selectedTab as string) ? selectedTab : "personal";

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and set your preferences.
        </p>
      </div>

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
              <PersonalForm initialData={personalInfo} />
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
              <ProfessionalForm />
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
  );
}
