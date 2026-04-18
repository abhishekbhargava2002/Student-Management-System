const mongoose = require("mongoose");

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
    },
    categoryNumber: {
      type: Number,
      unique: true,
    },
  },
  { timestamps: true },
);

// ✅ FIXED: Use correct model name 'studentcourse'
studentSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastEntry = await mongoose
      .model("studentcourse")
      .findOne()
      .sort({ categoryNumber: -1 }); // get highest categoryNumber

    this.categoryNumber = lastEntry ? lastEntry.categoryNumber + 1 : 1;
  }
  next();
});

module.exports = mongoose.model("studentcourse", studentSchema);
