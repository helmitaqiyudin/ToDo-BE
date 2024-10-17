import Note from "../models/noteModel.js";

export const createNote = async (req, res) => {
  const note = req.body;

  if (!note.title) {
    res.status(400).json({ success: false, message: "Title is required" });
  }

  const newNote = new Note(note);

  try {
    const savedNote = await newNote.save();
    res.status(201).json({ success: true, data: savedNote });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ isDeleted: false });
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getNoteById = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findOne({ _id: id, isDeleted: false });
    if (!note) {
      res.status(404).json({ success: false, message: "Note not found" });
    } else {
      res.status(200).json({ success: true, data: note });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const note = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true });
    if (!updatedNote) {
      res.status(404).json({ success: false, message: "Note not found" });
    }
    res.status(200).json({ success: true, data: updatedNote });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNote = await Note.findByIdAndUpdate(id, { isDeleted: true });
    if (!deletedNote) {
      res.status(404).json({ success: false, message: "Note not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
