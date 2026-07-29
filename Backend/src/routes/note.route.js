const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const { createNote, getAll, updateNote, deleteNote } = require("../controller/note.controller");

const noteRouter = express.Router();

noteRouter.post("/create", authMiddleware, createNote);
noteRouter.get("/get", authMiddleware, getAll);
noteRouter.put("/update/:id", authMiddleware, updateNote);
noteRouter.delete("/delete/:id", authMiddleware, deleteNote);

module.exports = noteRouter;

