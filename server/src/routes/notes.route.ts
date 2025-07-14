import { Router } from "express";
import {
  addNotes,
  addToFavirote,
  deleteNoteById,
  getNoteById,
  getNotes,
  updateNoteById,
} from "../controllers/notes.controller";
import { authorizeUser } from "../middlewares/auth.middleware";

const router = Router();

router.use(authorizeUser);
router.route("/").get(getNotes).post(addNotes);
router
  .route("/:id")
  .get(getNoteById)
  .put(updateNoteById)
  .delete(deleteNoteById);

router.route("/:id/favorite").patch(addToFavirote);

export default router;
