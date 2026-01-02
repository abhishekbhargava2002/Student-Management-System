const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    capacity: {
      type: Number,
      min: 1,
    },
    category: {
      type: String,
    },
    statusEvent: {
      type: String,
      enum: ["Approved", "Pending", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("event", EventSchema);
