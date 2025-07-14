import mongoose from "mongoose";
import { boolean } from "zod";

export interface INotes extends Document {
  title: string;
  content: string;
  tags: string[];
  isFavorite: boolean;
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
    isFavorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Notes = mongoose.model<INotes>("Notes", NotesSchema);
