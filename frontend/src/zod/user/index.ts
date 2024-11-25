import z from "zod";

export const zodUserSchemaForFrontEnd = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "name must be at least 3 character log" })
    .max(255)
    .optional(),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid Email" })
    .optional(),
  userName: z
    .string({ message: "Username is required" })
    .min(3, { message: "useName must be at least 3 character log" })
    .max(255)
    .optional(),
  password: z.string().optional(),
  profileImage: z.string().url({ message: "Invalid URL" }).optional(),
  profileImageFileId: z.string().optional(),
  coverImage: z.string().url({ message: "Invalid URL" }).optional(),
  coverImageFileId: z.string().optional(),
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
