import * as z from "zod";

const baseAuthSchema = z.object({
  username: z.string().min(3, "Min 3 symbols"),
  email: z.string().email("Wrong email format"),
  password: z.string().min(4, "Min 4 symbols"),
  confirmPassword: z.string()
});

export const volunteerSchema = baseAuthSchema.merge(
  z.object({
    firstName: z.string().min(2, "Min 2 symbols"),
    lastName: z.string().min(2, "Min 3 symbols"),
    dateOfBirth: z.date()
  })
).refine((data) => data.password === data.confirmPassword, {
  message: "The passwords don't match",
  path: ["confirmPassword"]
});

export const organizationSchema = baseAuthSchema.merge(
  z.object({
    organizationName: z.string().min(3, "Min 3 symbols")
  })
).refine((data) => data.password === data.confirmPassword, {
  message: "The passwords don't match",
  path: ["confirmPassword"]
});

export type VolunteerFormValues = z.infer<typeof volunteerSchema>;
export type OrganizationFormValues = z.infer<typeof organizationSchema>;