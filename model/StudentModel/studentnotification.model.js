const mongoose = require("mongoose");

const StudentNotificationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["All", "Teacher", "Student"],
      default: "All",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model(
  "studentnotification",
  StudentNotificationSchema
);
