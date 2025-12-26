const mongoose = require("mongoose");

const feePaymentSchema = new mongoose.Schema(
  {
    studentReferId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "studentRegistration", // your student model
      required: true,
    },
    feeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fee", // fee structure model
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Pending",
    },
    paymentMode: {
      type: String,
      enum: ["Online", "Offline"],
      default: "Offline",
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("feePayment", feePaymentSchema);
