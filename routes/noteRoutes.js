import express from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controller/noteController.js";

const noteRouter = express.Router();

noteRouter.post("", createNote);
noteRouter.get("", getNotes);
noteRouter.get("/:id", getNoteById);
noteRouter.put("/:id", updateNote);
noteRouter.delete("/:id", deleteNote);

export default noteRouter;
