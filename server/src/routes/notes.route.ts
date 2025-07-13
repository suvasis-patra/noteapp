import { Router } from "express";
import {
  addNotes,
  deleteNoteById,
  getNoteById,
  getNotes,
  updateNoteById,
} from "../controllers/notes.controller";

const router = Router();

router.route("/").get(getNotes).post(addNotes);
router
  .route("/:id")
  .get(getNoteById)
  .put(updateNoteById)
  .delete(deleteNoteById);

export default router;
