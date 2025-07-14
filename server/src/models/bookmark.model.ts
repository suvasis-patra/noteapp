import mongoose, { Document } from "mongoose";

export interface IBookMark extends Document {
  url: string;
  title: string;
  description: string;
  tags: string[];
}

export const BookMarkSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      require: true,
    },
  },
  { timestamps: true }
);

export const BookMarks = mongoose.model<IBookMark>("BookMarks", BookMarkSchema);
