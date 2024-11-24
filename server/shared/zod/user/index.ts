import z from "zod";

export const zodUserSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "name must be at least 3 character log" })
    .max(255),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid Email" }),
  userName: z
    .string({ message: "Username is required" })
    .min(3, { message: "useName must be at least 3 character log" })
    .max(255),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "password must be at least 6 character long" })
    .max(12, { message: "password must be at most 12 character long" }),
  profileImage: z.string().url({ message: "Invalid URL" }).optional(),
  coverImage: z.string().url({ message: "Invalid URL" }).optional(),
  isEmailVerified: z.boolean().default(false),
  bio: z.string().max(255).optional(),
  location: z.string().max(255).optional(),
  socialLinks: z
    .array(
      z.object({
        name: z.string().min(1).max(255),
        url: z.string().url({ message: "Invalid URL" }),
      }),
    )
    .optional(),
});

export const zodUserSchemaWithOptionalPassword = zodUserSchema.extend({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(12, { message: "Password must be at most 12 characters long" })
    .optional()
    .refine((val) => val === undefined || val.length >= 6, {
      message: "Password must be at least 6 characters long",
    }),
});

export type zodUserSchemaType = z.infer<typeof zodUserSchema>;

// sign-in schema
export const zodSignInSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid Email" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "password must be at least 6 character long" })
    .max(12, { message: "password must be at most 12 character long" }),
});

export type zodSignInSchemaType = z.infer<typeof zodSignInSchema>;

// reset password schema
export const zodResetPasswordSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid Email" }),
  old_password: z
    .string({ message: "Password is required" })
    .min(6, { message: "password must be at least 6 character long" })
    .max(12, { message: "password must be at most 12 character long" }),
  new_password: z
    .string({ message: "Password is required" })
    .min(6, { message: "password must be at least 6 character long" })
    .max(12, { message: "password must be at most 12 character long" }),
});

export type zodResetPasswordSchemaType = z.infer<typeof zodResetPasswordSchema>;

// update user schema
export const zodUpdateUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: "name must be at least 3 character log" })
    .max(255)
    .optional(),
  email: z.string().email({ message: "Invalid Email" }).optional(),
  userName: z
    .string()
    .min(3, { message: "useName must be at least 3 character log" })
    .max(255)
    .optional(),
  password: z.string().optional(),
  profileImage: z.string().url({ message: "Invalid URL" }).optional(),
  coverImage: z.string().url({ message: "Invalid URL" }).optional(),
  isEmailVerified: z.boolean().default(false),
  bio: z.string().max(255).optional(),
  location: z.string().max(255).optional(),
  socialLinks: z
    .array(
      z.object({
        name: z.string().min(1).max(255),
        url: z.string().url({ message: "Invalid URL" }),
      }),
    )
    .optional(),
});

export type zodUpdateUserSchemaType = z.infer<typeof zodUpdateUserSchema>;
