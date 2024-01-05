const express = require("express");
const app = express.Router();
const notesController = require("../controllers/notes.js");
const authMiddleware = require("../controllers/authMiddleware.js");

app.post("/notes", authMiddleware, notesController.createNote);
app.get("/notes", authMiddleware, notesController.getUserNotes);
app.get("/notes/:id", authMiddleware, notesController.getUserNoteById);

app.put("/notes/:id", authMiddleware, notesController.updateUserNoteById);
app.delete("/notes/:id", authMiddleware, notesController.deleteUserNoteById);
app.post("/notes/:id/share", authMiddleware, notesController.shareNote);

app.get("/search", authMiddleware, notesController.searchNotes);

module.exports = app;
