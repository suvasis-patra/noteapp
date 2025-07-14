import { Router } from "express";
import {
  addBookmark,
  addToFavirote,
  deleteBookmarkById,
  getBookmarkById,
  getBookmarks,
  updateBookmarkById,
} from "../controllers/bookmark.controller";
import { authorizeUser } from "../middlewares/auth.middleware";

const router = Router();

router.use(authorizeUser);
router.route("/").get(getBookmarks).post(addBookmark);
router
  .route("/:id")
  .get(getBookmarkById)
  .put(updateBookmarkById)
  .delete(deleteBookmarkById);

router.route("/:id/favorites").patch(addToFavirote);

export default router;
