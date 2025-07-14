import { Router } from "express";
import {
  addBookmark,
  addToFavirote,
  deleteBookmarkById,
  getBookmarkById,
  getBookmarks,
  updateBookmarkById,
} from "../controllers/bookmark.controller";

const router = Router();

router.route("/").get(getBookmarks).post(addBookmark);
router
  .route("/:id")
  .get(getBookmarkById)
  .put(updateBookmarkById)
  .delete(deleteBookmarkById);

router.route("/:id/favorites").patch(addToFavirote);

export default router;
