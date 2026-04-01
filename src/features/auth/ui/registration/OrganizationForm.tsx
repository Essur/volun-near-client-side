import { useForm } from "react-hook-form"
import { OrganizationFormValues, organizationSchema } from "../../model/register-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner";
import { authService } from "../../api/auth-api";
import { Button } from "@/shared/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { BaseAuthFields } from "./BaseAuthFields";

export const OrganizationForm = () => {
  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      organizationName: "",
    }
  });

  const onSubmit = async (data: OrganizationFormValues) => {
    try {
      await authService.registerOrganization(data);
      toast.success("Organization registered!");
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 409) {
        toast.error("Registration failed!", {
          description: error.response.data.message,
         })
      } else {
        toast.error("Unexpected error!");
      }
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <BaseAuthFields control={form.control}/>
          <div>
            <FormField control={form.control} name="organizationName" render={({field}) => (
              <FormItem>
                <FormLabel>Organization name</FormLabel>
                <FormControl><Input {...field}></Input></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
          </div>
          <Button type="submit" className="w-full mt-6">Sign Up as Organization</Button>
        </form>
      </Form>
    </>
  );
}