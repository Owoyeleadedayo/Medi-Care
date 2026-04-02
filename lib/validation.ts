import z from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters.")
    .max(32, "Name must be at most 32 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), {
    message: "Please enter a valid 10-digit phone number.",
  }),
});