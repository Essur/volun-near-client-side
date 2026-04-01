import { authService } from "@/features/auth/api/auth-api";
import { OrganizationForm } from "@/features/auth/ui/registration/OrganizationForm";
import { VolunteerForm } from "@/features/auth/ui/registration/VolunteerForm";
import { AuthNavigation } from "@/shared/ui/AuthNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const RegistrationPage = () => {
  useEffect(() => {
    authService.initCsrf().catch(console.error);
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <Tabs defaultValue="VOLUNTEER">
          <TabsList className="mb-6">
            <TabsTrigger value="VOLUNTEER">Volunteer</TabsTrigger>
            <TabsTrigger value="ORGANIZATION">Organization</TabsTrigger>
          </TabsList>
          <TabsContent value="VOLUNTEER">
            <VolunteerForm />
          </TabsContent>
          <TabsContent value="ORGANIZATION">
            <OrganizationForm />
          </TabsContent>
        </Tabs>
        <AuthNavigation text={"Already have an account?"} linkText={"Sign in"} to={"/auth/login"} />
      </div>
    </>
  );
}