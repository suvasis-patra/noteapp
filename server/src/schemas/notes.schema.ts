import * as z from "zod";

export const ZnoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()),
});

export type TNotes = z.infer<typeof ZnoteSchema>;
