const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  sharedNotes: [
    {
      sharedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      noteId: {
        type: Schema.Types.ObjectId,
        ref: "Note",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
