import * as z from "zod";

export const ZRegisterUser = z.object({
  username: z
    .string({ error: "This field is required" })
    .min(1, "This field is required"),
  password: z
    .string({ error: "This field is required" })
    .min(1, "This field is required")
    .min(8, "password is too short"),
  email: z.email("Enter a vaild email"),
  confirmPassword: z
    .string({ error: "This field is required" })
    .min(1, "This field is required")
    .min(8, "password is too short"),
});

export const ZLoginUser = z.object({
  password: z
    .string({ error: "This field is required" })
    .min(1, "This field is required"),

  email: z.email("Enter a vaild email"),
});

export type TUser = z.infer<typeof ZRegisterUser>;
