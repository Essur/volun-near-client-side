import { authService } from "@/features/auth/api/auth-api";
import { LoginForm } from "@/features/auth/ui/login/LoginForm";
import { AuthNavigation } from "@/shared/ui/AuthNavigation";
import { useEffect } from "react";

export const LoginPage = () => {
  useEffect(() => {
    authService.initCsrf().catch(console.error);
  }, []);

  return (
    <div className="flex flex-col">
      <LoginForm />
      <AuthNavigation text={"Don't have an account?"} linkText={"Sign up"} to={"/auth/registration"} />
    </div>
  );
}