import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner"
import { authService } from "../../api/auth-api"
import { BaseAuthFields } from "./BaseAuthFields"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { DatePicker } from "@/shared/ui/date-picker"
import { VolunteerFormValues, volunteerSchema } from "../../model/register-schemas"
import { handleApiError } from "@/shared/api/error-handler"

export const VolunteerForm = () => {
  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      dateOfBirth: undefined
    }
  });

  const onSubmit = async (data: VolunteerFormValues) => {
    try {
      await authService.registerVolunteer(data);
      toast.success("Volunteer registered!");
    } catch (error: any) {
      console.log(error);
      handleApiError(error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))} className='space-y-4'>
          <BaseAuthFields control={form.control} />
          <div className="flex flex-col gap-4">
            <FormField control={form.control} name="firstName" render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl><Input {...field}></Input></FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField control={form.control} name="lastName" render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl><Input {...field}></Input></FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={field.value ? new Date(field.value).toISOString().split('T')[0] : ""}
                      onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full mt-6">Sign Up as Volunteer</Button>
        </form>
      </Form>
    </>
  );
}