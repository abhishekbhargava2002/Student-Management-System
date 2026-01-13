const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentRegistration",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["teacher", "admin","student"],
    required: true,
  },
});

module.exports = new mongoose.model("message", MessageSchema);
