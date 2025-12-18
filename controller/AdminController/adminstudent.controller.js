const StudentRegistration = require("../../model/StudentModel/studentregistration.model");

const viewStudentAll = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized access",
      });
    }
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
    const student = await StudentRegistration.find().select(
      "-_id -Password -__v"
    );

    res.status(200).json({
      status: true,
      message: "View student detail by Admin",
      data: student,
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
    if (!req.user) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized access",
      });
    }
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

    const student = await StudentRegistration.findOne({ _id: id }).select(
      "-_id -Password -__v"
    );
    res.status(200).json({
      status: true,
      message: "View the Student detail by Id",
      data: student,
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
    res.status(200).json({
      status: true,
      message: "Create the Regiration of Student",
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

module.exports = { viewStudentAll, viewStudentById, createStudent };
