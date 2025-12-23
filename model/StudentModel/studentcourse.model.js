const mongoose = require("mongoose");
//StudentCourse
const studentSchema = new mongoose.Schema(
  {
    studentReferId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "studentRegistration",
      required: true,
    },
    teacherReferId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher",
    },
    adminReferId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    courseId: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    department: { 
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("studentcourse", studentSchema);
