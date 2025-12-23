const StudentCourse = require("../../model/StudentModel/studentcourse.model");

const createCourse = async (req, res) => {
  try {
    const exist = req.user.userId;
    const { courseId, courseName, department } =
      req.body;
   
    if (!courseId || !courseName || !department) { 
      return res.status(400).json({
        status: false,
        message: "All field is required",
      });
    }
 
    const create = await StudentCourse.create({
      studentReferId: exist,
      courseId,
      courseName,
      department,
    });

    res.status(200).json({
      status: true,
      message: "Create Successful",
      data: create,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error",
      message: error.message,
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const auth = req.user.userId;
    const { department } = req.body;
    if (!auth) {
      return res.status(400).json({
        status: false,
        message: "Authication header missing",
      });
    }
    const exist = await StudentCourse.findOne({ studentReferId: auth });
    if (!exist) {
      return res.status(403).json({
        status: false,
        message: "Student not existing",
      });
    }
    if (department) exist.department = department;

    await exist.save();
    res.status(200).json({
      status: true,
      message: "Update Successful",
      data: exist,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error",
      message: error.message,
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const auth = req.user.userId;
    if (!auth) {
      return res.status(400).json({
        status: false,
        message: "Authication header missing",
      });
    }
    const exist = await StudentCourse.findOneAndDelete({ studentReferId: auth });
    if (!exist) {
      return res.status(403).json({
        status: false,
        message: "Student Id is invalid",
      });
    }
    res.status(200).json({
      status: true,
      message: "Delete Succesful",
      data: exist,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const getCourse = async (req, res) => {
  try {
    const auth = req.user.userId;
    if (!auth) {
      return res.status(400).json({
        status: false,
        message: "Authication header missing",
      });
    }
    const find = await StudentCourse.findOne({ studentReferId: auth }).populate(
      "studentReferId"
    );
    if (!find) {
      return res.status(403).json({
        status: false,
        message: "Not existing",
      });
    }
    res.status(200).json({
      status: true,
      message: "Fetched Successful",
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
  createCourse,
  updateCourse,
  deleteCourse,
  getCourse,
};
