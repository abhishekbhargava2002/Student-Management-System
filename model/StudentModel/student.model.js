const mongoose = require("mongoose");
//StudentCourse
const studentSchema = new mongoose.Schema(
  {
    StudentReferId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "studentRegistration",
      required: true,
    },
    TeacherReferId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher",
    },
    AdminReferId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    CourseId: {
      type: String,
      required: true,
    },
    CourseName: {
      type: String,
      required: true,
    },
    Batch: {
      type: String,
      required: true,
    },
    Address: {
      Street: {
        type: String,
      },
      PostCode: {
        type: String,
      },
    },
    DOB: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("student", studentSchema);
