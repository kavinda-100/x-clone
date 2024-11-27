import z from "zod";

export const zodPostSchema = z.object({
  title: z.string({ message: "Title is required" }).min(1).max(255),
  content: z.string({ message: "Content is required" }).min(1).max(225), // description
  userId: z.string({ message: "User id is required" }),
  image_url: z.string().optional(),
  image_url_fileId: z.string().optional(),
  video_url: z.string().optional(),
  video_url_fileId: z.string().optional(),
});

export type zodPostSchemaType = z.infer<typeof zodPostSchema>;

export const zodCommentSchema = z.object({
  comment: z.string({ message: "Comment is required" }).min(1).max(225),
  userId: z.string({ message: "User id is required" }),
  postId: z.string({ message: "Post id is required" }),
});

export type zodCommentSchemaType = z.infer<typeof zodCommentSchema>;
