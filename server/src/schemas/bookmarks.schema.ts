import * as z from "zod";

export const ZbookmarkSchema = z.object({
  url: z.url("Invalid URL format").min(1, "URL is required"),
  title: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()),
});

export type TBookMarks = z.infer<typeof ZbookmarkSchema>;
