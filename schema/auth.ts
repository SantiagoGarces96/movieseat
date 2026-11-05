import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(1).max(200),
});

export const RegisterSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(8).max(200),
  name: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
});
