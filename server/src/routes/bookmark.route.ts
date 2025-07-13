import { Router } from "express";
import {
  addBookmark,
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

export default router;
