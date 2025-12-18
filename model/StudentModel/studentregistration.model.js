const mongoose = require("mongoose");

const studentRegistrationSchema = new mongoose.Schema({
  StudentId: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PhoneNumber: {
    type: String,
  },
  Password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "studentRegistration",
  studentRegistrationSchema
);
