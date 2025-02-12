import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password length must be at least 6 characters")
    .max(20, "Password must not be longer than 20 characters"),
});

export const registerUserSchema = loginUserSchema.extend({
  name: z
    .string()
    .min(3, "User name must be at least 3 characters")
    .max(30, "User name must not be longer than 30 characters"),
  phoneNumber: z
    .string()
    .regex(/^\+\d{1,3}\d{7,14}$/, "Invalid phone number format"),
});
