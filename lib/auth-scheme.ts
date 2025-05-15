import { z } from "zod";

export const SignInValidateScheme = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(8),
});
export const SignUpValidateScheme = z.object({
  name: z.string().min(1).max(20),
  email: z.string().email(),
  password: z.string().min(1).max(8),
});
