const mongoose = require("mongoose");

const studentAttendanceSchema = new mongoose.Schema({
  studentReferId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentRegistration",
    required: true,
  },
  studentCourseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentcourse",
    required: true,
  }, 
  date: {
    type: Date,
    default: Date.now,
  }, 
  attendance: {
    type: String,
    enum: ["Present", "Absent"],
    default: "Absent",
  },
});

module.exports = mongoose.model("studentAttendance", studentAttendanceSchema);
