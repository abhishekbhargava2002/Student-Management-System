const teacherRegistration = require("../../model/TeacherModel/teacher.model");
const bcrypt = require("bcryptjs");

//Teacher Management
const viewTeacherAll = async (req, res) => {
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

    const find = await teacherRegistration
      .find()
      .select("-_id -password -createdAt -updatedAt -__v");

    res.status(200).json({
      status: true,
      message: "View all Teacher by Admin",
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

const viewTeacherById = async (req, res) => {
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

    const find = await teacherRegistration
      .findOne({ _id: id })
      .select("-_id -password -createdAt -updatedAt -__v");
    if (!find) {
      return res.status(401).json({
        status: false,
        message: "Invalid Id",
      });
    }

    res.status(200).json({
      status: true,
      message: "View the details of Teacher by Id",
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

const createTeacher = async (req, res) => {
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
    const { name, email, password } = req.body;

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
    if (!name || !email || !password) {
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

    if (password.length < 8) {
      return res.status(400).json({
        status: false,
        message: "Password must be at least 8 characters",
      });
    }

    const create = await teacherRegistration.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    res.status(201).json({
      status: true,
      message: "New Teacher registered successfully",
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

const updateTeacher = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const role = req.user.role;
    const { id } = req.params;
    const { name, email, newPassword } = req.body;
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
    if (id.length !== 24) {
      return res.status(400).json({
        status: false,
        message: "Id length must be 24(charactior)",
      });
    }

    const find = await teacherRegistration.findOne({ _id: id });
    if (!find) {
      return res.status(401).json({
        status: false,
        message: "Invalid Id",
      });
    }
    if (name) {
      find.name = name;
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
      message: "Update the Teacher detail by Admin",
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

const deleteTeacher = async (req, res) => {
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
    if (id.length !== 24) {
      return res.status(400).json({
        status: false,
        message: "Id length must be 24(charactior)",
      });
    }

    const find = await teacherRegistration.findOneAndDelete({ _id: id });
    if (!find) {
      res.status(401).json({
        status: false,
        message: "Id is invalid",
      });
    }

    res.status(200).json({
      status: true,
      message: "Delete the Teacher by Admin",
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
  viewTeacherAll,
  viewTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
