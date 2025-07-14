import { z } from "zod";

export const ZRegisterUser = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TRegisterUser = z.infer<typeof ZRegisterUser>;

export const ZLoginUser = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type TLoginUser = z.infer<typeof ZLoginUser>;
