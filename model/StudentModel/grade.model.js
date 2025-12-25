const mongoose = require("mongoose");

const GradeSchema = new mongoose.Schema(
  {
    gradeId: {
      type: String,
      required: true,
      unique: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "studentRegistration",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "studentcourse",
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher",
      required: true,
    },
    subject: {
      type: [String],
      enum: ["OS", "CN", "DBMS", "DSA"],
      required: true,
    },
    mark: {
      type: [Number],
      default: null,
    },
    totalMark: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("grade", GradeSchema);
