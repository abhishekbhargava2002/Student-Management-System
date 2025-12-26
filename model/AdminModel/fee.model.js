const mongoose = require("mongoose");

const FeeSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      enum: ["BTech", "MTech"],
    },
    tuitionFee: {
      type: Number,
      required: true,
      min: 0,
    },
    examinationFee: {
      type: Number,
      required: true,
      min: 0,
    },
    transportFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    activityFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    libraryFee: {
      type: Number,
      required: true,
      min: 0,
    },
    labFee: {
      type: Number,
      required: true,
      min: 0,
    },
    totalFee: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("fee", FeeSchema);
