const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },

    category: {
      type: String,
      enum: ["Personal", "Work", "Study", "Ideas", "Others"],
      default: "Others",
    },

    color: {
      type: String,
      default: "#ffffff", // Default White
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("Note", noteSchema);