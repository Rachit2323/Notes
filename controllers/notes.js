const Note = require("../models/notes.js");
const User = require("../models/user.js");

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: "Title and content are required fields",
      });
    }

    const newNote = new Note({
      title,
      content,
      user: userId,
    });

    await newNote.save();

    res.status(201).json({
      success: true,
      data: newNote,
      message: "Note created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while creating the note",
    });
  }
};

exports.getUserNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const userNotes = await Note.find({ user: userId });

    res.status(200).json({
      success: true,
      data: userNotes,
      message: "User notes retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while fetching user notes",
    });
  }
};

exports.getUserNoteById = async (req, res) => {
  try {
    const userId = req.userId;
    const noteId = req.params.id;

    const userNote = await Note.findOne({ _id: noteId, user: userId });

    if (!userNote) {
      return res.status(404).json({
        success: false,
        error: "Note not found for the given ID",
      });
    }

    res.status(200).json({
      success: true,
      data: userNote,
      message: "User note retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while fetching user note",
    });
  }
};

exports.updateUserNoteById = async (req, res) => {
  try {
    const userId = req.userId;
    const noteId = req.params.id;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: "Both title and content are required for the update",
      });
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, user: userId },
      { title, content, updated_at: Date.now() },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        error: "Note not found for the given ID",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedNote,
      message: "User note updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while updating user note",
    });
  }
};

exports.deleteUserNoteById = async (req, res) => {
  try {
    const userId = req.userId;
    const noteId = req.params.id;

    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      user: userId,
    });

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        error: "Note not found for the given ID",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedNote,
      message: "User note deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while deleting user note",
    });
  }
};

exports.searchNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const query = req.query.que;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: "Search query parameter 'q' is missing",
      });
    }

    const searchResults = await Note.find({
      user: userId,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    res.status(200).json({
      success: true,
      data: searchResults,
      message: "Search results retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while performing the search",
    });
  }
};

exports.shareNote = async (req, res) => {
  try {
    const userId = req.userId;
    const noteId = req.params.id;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email address is required to share the note",
      });
    }


    const note = await Note.findOne({ _id: noteId, user: userId });

    if (!note) {
      return res.status(404).json({
        success: false,
        error: "Note not found for the given ID",
      });
    }

    const shareWithUser = await User.findOne({ email });

    if (!shareWithUser) {
      return res.status(404).json({
        success: false,
        error: "User not found with the provided email address",
      });
    }


    if (!shareWithUser.sharedNotes) {
      shareWithUser.sharedNotes = [];
    }

    // Check if the note is already shared with the user
    const existingSharedNote = shareWithUser.sharedNotes.find(
      (sharedNote) => sharedNote.sharedBy.equals(shareWithUser._id)
    );

    if (existingSharedNote) {
      return res.status(400).json({
        success: false,
        error: "Note is already shared with the user",
      });
    }

    // Add the shared note details to sharedNotes array
    shareWithUser.sharedNotes.push({
      sharedBy: req.userId,
      noteId: note._id,
    });

    await shareWithUser.save();

    res.status(200).json({
      success: true,
      data: note,
      message: "Note shared successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while sharing the note",
    });
  }
};


