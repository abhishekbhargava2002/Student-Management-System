const mongoose = require("mongoose");

const studentRegistrationSchema = new mongoose.Schema({
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dcf03jl77/image/upload/v1767157131/StudentManagementSystem/aupyk142hm0mavtwp88i.jpg",
  },
  studentId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  otpExpire: {
    type: Number,
  },
});

module.exports = mongoose.model(
  "studentRegistration",
  studentRegistrationSchema
);
