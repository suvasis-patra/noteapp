import mongoose from "mongoose";

interface INotes {
  title: string;
  content: string;
  tags: string[];
}

export const NotesSchema = new mongoose.Schema<INotes>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export const Notes = mongoose.model<INotes>("Notes", NotesSchema);
