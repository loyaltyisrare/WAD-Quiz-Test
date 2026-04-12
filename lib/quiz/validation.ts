import { z } from "zod";

export const leadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Invalid email address"),
  socialHandle: z.string().optional(),
  phone: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
  gender: z.string().min(1, "Please select an option"),
  age: z.string().min(1, "Age is required"),
});
