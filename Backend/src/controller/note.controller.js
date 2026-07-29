const userModel = require("../models/user.model");
const noteModel = require("../models/note.model");

exports.createNote = async (req, res) => {
  try {
    const { title, content, category, color, isPinned } = req.body;

    const note = await noteModel.create({
      title,
      content,
      category,
      color,
      isPinned,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  const note = await noteModel.find({
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    message: "Note fetched successfully",
    totalNotes: note.length,
    notes: note
  });
};

exports.updateNote = async (req, res) => {
  try {
    const { title, content, category, color, isPinned } = req.body;

    const note = await noteModel.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        title,
        content,
        category,
        color,
        isPinned,
      },
      {
        new: true,
      }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteNote = async (req, res) => {
  try {
    const note = await noteModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};