import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ZbookmarkSchema } from "../schemas/bookmarks.schema";
import { BookMarks, IBookMark } from "../models/bookmark.model";

export const addBookmark = asyncHandler(async (req: Request, res: Response) => {
  const parsed = ZbookmarkSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, "Invalid bookmark data");
  }

  const { url, title, description, tags } = parsed.data;
  const bookmark = await BookMarks.create({ url, title, description, tags });

  res
    .status(201)
    .json(new ApiResponse<IBookMark>(201, bookmark, "Bookmark added!"));
});

export const getBookmarks = asyncHandler(
  async (req: Request, res: Response) => {
    const { q, tags, page = 1, limit = 10 } = req.query;
    const filter: Record<string, any> = {};

    if (q) {
      filter.$or = [
        { title: new RegExp(q as string, "i") },
        { description: new RegExp(q as string, "i") },
      ];
    }

    if (tags) {
      filter.tags = { $in: (tags as string).split(",") };
    }

    const total = await BookMarks.countDocuments(filter);
    const bookmarks = await BookMarks.find(filter)
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
          bookmarks,
        },
        "Bookmarks fetched successfully"
      )
    );
  }
);

export const getBookmarkById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const bookmark = await BookMarks.findById(id);

    if (!bookmark) {
      throw new ApiError(404, "Bookmark not found!");
    }

    res
      .status(200)
      .json(
        new ApiResponse<IBookMark>(
          200,
          bookmark,
          "Bookmark fetched successfully"
        )
      );
  }
);

export const updateBookmarkById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsed = ZbookmarkSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ApiError(400, "Invalid bookmark data");
    }

    const bookmark = await BookMarks.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    });

    if (!bookmark) {
      throw new ApiError(404, "Bookmark not found!");
    }

    res
      .status(200)
      .json(
        new ApiResponse<IBookMark>(
          200,
          bookmark,
          "Bookmark updated successfully"
        )
      );
  }
);

export const deleteBookmarkById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleted = await BookMarks.findByIdAndDelete(id);
    if (!deleted) {
      throw new ApiError(404, "Bookmark not found!");
    }

    res
      .status(204)
      .json(new ApiResponse(204, null, "Bookmark deleted successfully"));
  }
);

export const addToFavirote = asyncHandler(
  async (req: Request, res: Response) => {
    const bookmark = await BookMarks.findById(req.params.id);
    if (!bookmark) throw new ApiError(404, "Bookmark not found");

    bookmark.isFavorite = !bookmark.isFavorite;
    await bookmark.save();

    res.status(200).json(new ApiResponse(200, bookmark, "Toggled favorite"));
  }
);
