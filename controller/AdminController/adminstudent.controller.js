const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const studentRegistration = require("../../model/StudentModel/studentregistration.model");

//Student Management
const viewStudentAll = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const role = req.user.role;

    // AUTHENTICATION CHECK
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized access",
      });
    }

    // AUTHORIZATION CHECK
    if (role !== "admin") {
      return res.status(403).json({
        status: false,
        message: "Admin access only",
      });
    }

    const find = await studentRegistration.find().select("-_id -password -__v");

    res.status(200).json({
      status: true,
      message: "View all student by Admin",
      data: find,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const viewStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.userId;
    const role = req.user.role;
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }
    if (role !== "admin") {
      return res.status(401).json({
        status: false,
        message: "Admin only access the data",
      });
    }

    const find = await studentRegistration
      .findOne({ _id: id })
      .select("-_id -password -__v");
    if (!find) {
      return res.status(401).json({
        status: false,
        message: "Invalid Id",
      });
    }

    res.status(200).json({
      status: true,
      message: "View the details of student by Id",
      data: find,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const createStudent = async (req, res) => {
  try {
    // SAFE CHECK
    if (!req.user) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized access",
      });
    }

    const adminId = req.user.userId;
    const role = req.user.role;
    const { name, email, phoneNumber, password } = req.body;

    // AUTHENTICATION
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized access",
      });
    }

    // AUTHORIZATION
    if (role !== "admin") {
      return res.status(403).json({
        status: false,
        message: "Admin access only",
      });
    }

    // VALIDATION
    if (!name || !email || !phoneNumber || !password) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: false,
        message: "Invalid email format",
      });
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        status: false,
        message: "Phone number must be 10 digits (Indian format)",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        status: false,
        message: "Password must be at least 8 characters",
      });
    }

    const create = await studentRegistration.create({
      studentId: uuidv4(),
      name,
      email,
      phoneNumber,
      password: await bcrypt.hash(password, 10),
    });

    res.status(201).json({
      status: true,
      message: "New student registered successfully",
      data: create,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const role = req.user.role;
    const { id } = req.params;
    const { name, email, phoneNumber, newPassword } = req.body;
    // AUTHENTICATION
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized access",
      });
    }
    // AUTHORIZATION
    if (role !== "admin") {
      return res.status(403).json({
        status: false,
        message: "Admin access only",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }
    const find = await studentRegistration.findOne({ studentId: id });
    if (!find) {
      return res.status(401).json({
        status: false,
        message: "StudentId not found",
      });
    }
    if (!find) {
      return res.status(401).json({
        status: false,
        message: "Invalid Id",
      });
    }
    if (name) {
      find.name = name;
    }
    if (phoneNumber) {
      find.phoneNumber = phoneNumber;
    }
    if (email) {
      find.email = email;
    }
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      find.password = hashedPassword;
    }

    await find.save();
    res.status(200).json({
      status: true,
      message: "Update the Student detail by Admin",
      data: find,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const role = req.user.role;
    const { id } = req.params;
    // AUTHENTICATION
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized access",
      });
    }
    // AUTHORIZATION
    if (role !== "admin") {
      return res.status(403).json({
        status: false,
        message: "Admin access only",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }

    const find = await studentRegistration.findOneAndDelete({ studentId: id });
    if (!find) {
      res.status(401).json({
        status: false,
        message: "Id is invalid",
      });
    }

    res.status(200).json({
      status: true,
      message: "Delete the Student by Admin",
      data: find,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  viewStudentAll,
  viewStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
