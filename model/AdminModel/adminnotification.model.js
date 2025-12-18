const mongoose = require("mongoose");

const adminNotificationSchema = new mongoose.Schema({
  adminReferId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true,
  },
  message: {
    type: String,
    default: "Notification by Admin",
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("adminmessage", adminNotificationSchema);
