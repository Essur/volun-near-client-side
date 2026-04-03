import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "../../model/login-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../api/auth-api";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "@/shared/api/error-handler";
import { useAuth } from "@/app/providers/auth/useAuth";

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await authService.login(data);
      const appUser = await authService.fetchUser();
      login(appUser);
      toast.success("Welcome back!", {
        description: "You have successfully logged in.",
      });
      navigate("/")
    } catch (error) {
      console.log(error);
      handleApiError(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField control={form.control} name="username" render={({ field }) => (
            <FormItem>
              <FormLabel>Username or email</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl><Input {...field} type="password" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button type="submit" className="w-full mt-6">Login</Button>
        </form>
      </Form>
    </>
  );
}