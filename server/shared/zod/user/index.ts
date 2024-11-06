import z from 'zod';


export const zodUserSchema = z.object({
    name: z.string({message: "Name is required"}).min(3, {message : "name must be at least 3 character log"}).max(255),
    email: z.string({message: "Email is required"}).email({message: "Invalid Email"}),
    userName: z.string({message: "Username is required"}).min(3, {message : "useName must be at least 3 character log"}).max(255),
    password: z.string({message: "Password is required"})
        .min(6, {message: "password must be at least 6 character long"})
        .max(12, {message: "password must be at most 12 character long"}),
    profileImage: z.string().url({message: "Invalid URL"}).optional(),
    coverImage: z.string().url({message: "Invalid URL"}).optional(),
    bio: z.string().max(255).optional(),
    location: z.string().max(255).optional(),
    socialLinks: z.array(z.object({
        name: z.string().min(3).max(255),
        url: z.string().url({message: "Invalid URL"}),
    })).optional(),
})

export type zodUserSchemaType = z.infer<typeof zodUserSchema>;


// sign-in schema
export const zodSignInSchema = z.object({
    email: z.string({message: "Email is required"}).email({message: "Invalid Email"}),
    password: z.string({message: "Password is required"})
        .min(6, {message: "password must be at least 6 character long"})
        .max(12, {message: "password must be at most 12 character long"}),
})

export type zodSignInSchemaType = z.infer<typeof zodSignInSchema>;