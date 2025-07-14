import { Request, Response } from "express";

import { ApiError } from "../utils/ApiError";
import { INotes, Notes } from "../models/notes.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ZnoteSchema } from "../schemas/notes.schema";
import { ApiResponse } from "../utils/ApiResponse";

export const addNotes = asyncHandler(async (req: Request, res: Response) => {
  const notesInfo = ZnoteSchema.safeParse(req.body);
  if (!notesInfo.success) {
    throw new ApiError(400, "Invalid Data!");
  }
  const { content, tags, title } = notesInfo.data;
  const note = await Notes.create({ content, tags, title });

  res.status(201).json(new ApiResponse<INotes>(201, note, "Notes added!"));
});

export const getNotes = asyncHandler(async (req: Request, res: Response) => {
  const { q, tags, page = 1, limit = 10 } = req.query;
  const filter: Record<string, any> = {};

  if (q) {
    filter.$or = [
      { title: new RegExp(q as string, "i") },
      { content: new RegExp(q as string, "i") },
    ];
  }

  if (tags) {
    filter.tags = { $in: (tags as string).split(",") };
  }

  const total = await Notes.countDocuments(filter);
  const notes = await Notes.find(filter)
    .sort("-updatedAt")
    .skip((parseInt(page as string) - 1) * parseInt(limit as string))
    .limit(Number(limit));

  res.status(200).json(
    new ApiResponse(
      200,
      {
        total,
        page: Number(page),
        totalPages: Math.ceil(total / parseInt(limit as string)),
        notes,
      },
      "success"
    )
  );
});

export const getNoteById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const note = await Notes.findById(id);

  if (!note) {
    throw new ApiError(404, "Note not found!");
  }

  res
    .status(200)
    .json(new ApiResponse<INotes>(200, note, "Note fetched successfully"));
});

export const updateNoteById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const noteInfo = ZnoteSchema.safeParse(req.body);
    if (!noteInfo.success) {
      throw new ApiError(400, "Invalid data");
    }
    const note = await Notes.findByIdAndUpdate(id, noteInfo.data, {
      new: true,
      runValidators: true,
    });
    if (!note) {
      throw new ApiError(404, "Note not found!");
    }
    res.status(200).json(new ApiResponse<INotes>(200, note, "Success"));
  }
);

export const deleteNoteById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedNote = await Notes.findByIdAndDelete(id);

    if (!deletedNote) {
      throw new ApiError(404, "Note not found!");
    }

    res
      .status(204)
      .json(new ApiResponse(204, null, "Note deleted successfully"));
  }
);

export const addToFavirote = asyncHandler(
  async (req: Request, res: Response) => {
    const bookmark = await Notes.findById(req.params.id);
    if (!bookmark) throw new ApiError(404, "Bookmark not found");

    bookmark.isFavorite = !bookmark.isFavorite;
    await bookmark.save();

    res.status(200).json(new ApiResponse(200, bookmark, "Toggled favorite"));
  }
);
