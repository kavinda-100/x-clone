import z from "zod";

export const zodMessageSchema = z.object({
  message: z.string().optional(),
  image_url: z.string().url().optional(),
  image_url_fileId: z.string().optional(),
  sender_id: z.string({ message: "sender_id is required" }),
  receiver_id: z.string({ message: "receiver_id is required" }),
});

export type zodMessageSchemaType = z.infer<typeof zodMessageSchema>;
