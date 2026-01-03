const Grade = require("../../model/StudentModel/grade.model");
const Teacher = require("../../model/TeacherModel/teacher.model");
const Course = require("../../model/StudentModel/studentcourse.model");
const { v4: uuidv4 } = require("uuid");

//Teacher Mangement By Grade
const createGrade = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const role = req.user.role;
    const { subject, mark, totalMark } = req.body;
    const { id } = req.params;
    // Authentication
    if (!teacherId) {
      return res.status(401).json({
        status: false,
        message: "Authentication required",
      });
    }
    // Authorization
    if (role !== "teacher") {
      return res.status(403).json({
        status: false,
        message: "Access denied: Teacher only",
      });
    }
    if (!subject || !mark) {
      return res.staus(400).json({
        status: false,
        message: "All field are required",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }
    if (id.length !== 24) {
      return res.status(401).json({
        status: false,
        message: "Id length must be 24(side)",
      });
    }
    //Teacher
    const findTeacher = await Teacher.findOne({ _id: teacherId });
    if (!findTeacher) {
      return res.status(403).json({
        status: false,
        message: "TeacherId not found",
      });
    }
    const findCourse = await Course.findOne({ studentReferId: id });
    if (!findCourse) {
      return res.status(403).json({
        status: false,
        message: "CourseId not found",
      });
    }
    const courseReferId = findCourse._id.toString();
    const create = await Grade.create({
      gradeId: uuidv4(),
      studentId: id,
      courseId: courseReferId,
      teacherId: findTeacher,
      subject,
      mark,
      totalMark,
    });

    res.status(200).json({
      status: true,
      message: "Create grade",
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

const updateGrade = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const role = req.user.role;
    const { id } = req.params;
    const { subject, mark } = req.body;
    // Authentication
    if (!teacherId) {
      return res.status(401).json({
        status: false,
        message: "Authentication required",
      });
    }
    // Authorization
    if (role !== "teacher") {
      return res.status(403).json({
        status: false,
        message: "Access denied: Teacher only",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }
    const gradefind = await Grade.findOne({ gradeId: id });
    if (!gradefind) {
      return res.status(401).json({
        status: false,
        message: "GradeId not found",
      });
    }
    if (subject) {
      gradefind.subject = subject;
    }
    if (mark) {
      gradefind.mark = mark;
    }

    await gradefind.save();
    res.status(200).json({
      status: true,
      message: `Update by GradeId: ${id}`,
      data: gradefind,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const deleteGrade = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const role = req.user.role;
    const { id } = req.params;
    // Authentication
    if (!teacherId) {
      return res.status(401).json({
        status: false,
        message: "Authentication required",
      });
    }
    // Authorization
    if (role !== "teacher") {
      return res.status(403).json({
        status: false,
        message: "Access denied: Teacher only",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }
    const gradefind = await Grade.findOneAndDelete({ gradeId: id });
    if (!gradefind) {
      return res.staus(401).json({
        status: false,
        message: "GradeId is not found",
      });
    }
    res.status(200).json({
      status: true,
      message: `Delete by GradeId: ${id}`,
      data: gradefind,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const getGradeById = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const role = req.user.role;
    const { id } = req.params;
    // Authentication
    if (!teacherId) {
      return res.status(401).json({
        status: false,
        message: "Authentication required",
      });
    }
    // Authorization
    if (role !== "teacher") {
      return res.status(403).json({
        status: false,
        message: "Access denied: Teacher only",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }
    const gradefind = await Grade.findOne({ gradeId: id });
    if (!gradefind) {
      return res.status(401).json({
        status: false,
        message: "GradeId is not found",
      });
    }
    res.status(200).json({
      status: true,
      message: `Get By GradeId: ${id}`,
      data: gradefind,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const getGradeAll = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const role = req.user.role;
    // Authentication
    if (!teacherId) {
      return res.status(401).json({
        status: false,
        message: "Authentication required",
      });
    }
    // Authorization
    if (role !== "teacher") {
      return res.status(403).json({
        status: false,
        message: "Access denied: Teacher only",
      });
    }
    const gradefind = await Grade.find().select(
      "-_id -createdAt -updatedAt -__v"
    );

    res.status(200).json({
      status: true,
      message: "Get All Grade Details",
      data: gradefind,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createGrade,
  updateGrade,
  deleteGrade,
  getGradeById,
  getGradeAll,
};
