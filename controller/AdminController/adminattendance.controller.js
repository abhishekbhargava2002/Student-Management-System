const AdminNotification = require("../../model/AdminModel/adminnotification.model");
const StudentAttendance = require("../../model/StudentModel/attendanceTable.model");
const StudentCourse = require("../../model/StudentModel/studentcourse.model");
//MANAGE ATTENDANCE

const viewattendance = async (req, res) => {
  try {
    const role = req.user.role;
    const adminId = req.user.userId;
    const { attendance } = req.body;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Admin Id is not found",
      });
    }
    if (role !== "admin") {
      return res.status(401).json({
        status: false,
        message: "Admin not found",
      });
    }
    if (!attendance) {
      return res.status(400).json({
        status: false,
        message: "Attendance is required",
      });
    }
    if (attendance !== "Present" && attendance !== "Absent") {
      return res.status(400).json({
        status: false,
        message: "Insert must be Present or Absent",
      });
    }

    const findAttendance = await StudentAttendance.find({
      attendance: attendance,
    }).populate({
      path: "studentCourseId",
      select: "-Address -_id -StudentReferId -createdAt -updatedAt -__v",
    });

    await AdminNotification.create({
      adminReferId: adminId,
      message: `Admin view the details by attendance`,
    });
    res.status(200).json({
      status: true,
      message: "View the attendance by Admin",
      data: findAttendance,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const viewAttendanceById = async (req, res) => {
  try {
    const role = req.user.role;
    const adminId = req.user.userId;
    const { id } = req.params;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Admin not found",
      });
    }
    if (role !== "admin") {
      return res.status(401).json({
        status: false,
        message: "Admin only access",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }
    const find = await StudentAttendance.findOne({
      studentReferId: id,
    }).populate({
      path: "studentCourseId",
      select: "-Address -_id -studentReferId -createdAt -updatedAt -__v",
    });

    await AdminNotification.create({
      adminReferId: adminId,
      message: `Admin view the details by Id: ${id}`,
    });
    res.status(200).json({
      status: true,
      message: "View the attendance by Admin",
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

const viewAttendanceAllStudentAttendance = async (req, res) => {
  try {
    const role = req.user.role;
    const adminId = req.user.userId;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Admin not found",
      });
    }
    if (role !== "admin") {
      return res.status(401).json({
        status: false,
        message: "Admin not found",
      });
    }

    const find = await StudentAttendance.find({}).populate("studentReferId");
    if (!find) {
      return res.status(401).json({
        status: false,
        message: "Not existing",
      });
    }
    await AdminNotification.create({
      adminReferId: adminId,
      message: `Admin view the detail of all student`,
    });
    res.status(200).json({
      status: true,
      message: "View all Student attendance by Admin",
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

const createAttendance = async (req, res) => {
  try {
    const role = req.user.role;
    const { attendancemark } = req.body;
    const adminId = req.user.userId;
    const { id } = req.params;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Admin not found",
      });
    }
    if (role !== "admin") {
      return res.status(401).json({
        status: false,
        message: "Admin not found",
      });
    }
    if (!attendancemark) {
      return res.status(401).json({
        status: false,
        message: "Attendance is required",
      });
    }
    const findstudent = await StudentCourse.findOne({ studentReferId: id });
    if (!findstudent) {
      return res.status(403).json({
        status: false,
        message: "StudentId not found",
      });
    }
    const studentId = findstudent.studentReferId.toString();
    const courseId = findstudent._id.toString();

    console.log(studentId, "  ", courseId);
    const create = await StudentAttendance.create({
      studentReferId: studentId,
      studentCourseId: courseId,
      attendance: attendancemark,
    });

    await AdminNotification.create({
      adminReferId: adminId,
      message: `Admin marks a attendance`,
    });
    res.status(200).json({
      status: true,
      message: "Create Attendance by Admin",
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

const updateAttendance = async (req, res) => {
  try {
    const role = req.user.role;
    const { id } = req.params;
    const { attend } = req.body;
    const adminId = req.user.userId;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Admin not found",
      });
    }
    if (role !== "admin") {
      return res.status(401).json({
        status: false,
        message: "Admin not found",
      });
    }

    if (!attend || !id) {
      return res.status(401).json({
        status: false,
        message: "Attendance or Id is required",
      });
    }

    const update = await StudentAttendance.findOneAndUpdate(
      { _id: id },
      { attendance: attend }
    );

    await AdminNotification.create({
      adminReferId: adminId,
      message: `Admin update the attendance`,
    });
    res.status(200).json({
      status: true,
      message: "Update Attendance by Admin",
      data: update,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const role = req.user.role;
    const { id } = req.params;
    const adminId = req.user.userId;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Admin not found",
      });
    }
    if (role !== "admin") {
      return res.status(401).json({
        status: false,
        message: "Admin not found",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }

    const deleteData = await StudentAttendance.findByIdAndDelete({ _id: id });
    await AdminNotification.create({
      adminReferId: adminId,
      message: `Admin delete the attendance`,
    });
    res.status(200).json({
      status: true,
      message: "Delete the Attendance by Admin",
      data: deleteData,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const deleteAttendanceByStudent = async (req, res) => {
  try {
    const role = req.user.role;
    const { id } = req.params;
    const adminId = req.user.userId;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Admin not found",
      });
    }
    if (role !== "admin") {
      return res.status(401).json({
        status: false,
        message: "Admin not found",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }
    const findstudent = await StudentAttendance.findOneAndDelete({
      studentReferId: id,
    });
    if (!findstudent) {
      return res.status(401).json({
        status: false,
        message: "Student Id not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Delete the Attendance record of all in store database",
      data: findstudent,
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
  viewattendance,
  viewAttendanceById,
  viewAttendanceAllStudentAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  deleteAttendanceByStudent,
};
