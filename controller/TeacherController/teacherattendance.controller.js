const Teacher = require("../../model/TeacherModel/teacher.model");
const StudentAttendance = require("../../model/StudentModel/attendanceTable.model");
const StudentCourse = require("../../model/StudentModel/studentcourse.model");

//MANAGE ATTENDANCE
const teacherViewAttend = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    if (!teacherId) {
      return res.status(401).json({
        status: false,
        message: "UnAuthication",
      });
    }

    const teacherFind = await Teacher.find({ _id: teacherId });
    if (!teacherFind) {
      return res.status(401).json({
        status: false,
        message: "Teacher not existing",
      });
    }

    const studentFind = await StudentAttendance.find();

    res.status(200).json({
      status: true,
      message: `Teacher View the Attendance by Id: ${teacherId}`,
      data: { teacherFind, studentFind },
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const teacherViewAttendById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacherId = req.user.userId;
    if (!teacherId) {
      return res.status(401).json({
        status: false,
        message: "UnAuthication",
      });
    }
    const studentFind = await StudentAttendance.findOne({ _id: id });

    res.status(200).json({
      status: true,
      message: `Teacher view the attendance by Id: ${teacherId} of Student Id: ${id}`,
      data: studentFind,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const teacherViewByAttendance = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const { attend } = req.body;
    if (!teacherId) {
      return res.status(401).json({
        status: false,
        message: "UnAuthication",
      });
    }

    const teacherFind = await Teacher.find({ _id: teacherId });
    if (!teacherFind) {
      return res.status(401).json({
        status: false,
        message: "Teacher not existing",
      });
    }

    const studentFind = await StudentAttendance.find({ attendance: attend });
    // studentFind.forEach((s) => console.log(s.attendance));

    res.status(200).json({
      status: true,
      message: `Attendance view by Id: ${teacherId}`,
      data: { teacherFind, studentFind },
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const teacherUpdateByAttendance = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const { id } = req.params;
    const { attendmark } = req.body;
    if (!teacherId) {
      return res.status(401).json({
        status: false,
        message: "UnAuthication",
      });
    }
    const teacherFind = await Teacher.findOne({ _id: teacherId });
    if (!teacherFind) {
      return res.status(401).json({
        status: false,
        message: "Teacher not existing",
      });
    }

    const courseUpdate = await StudentAttendance.findOneAndUpdate(
      { _id: id },
      { attendance: attendmark }
    );

    res.status(200).json({
      status: true,
      message: `Update the Attendance of Teacher Id: ${teacherId} `,
      data: courseUpdate,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const teacherDeleteAttendance = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const { id } = req.params;
    if (!teacherId) {
      return res.status(401).json({
        status: false,
        message: "Teacher Id not found",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }

    const findAttendance = await StudentAttendance.findOneAndDelete({
      _id: id,
    });
    if (!findAttendance) {
      return res.status(401).json({
        status: false,
        message: "Invalid Id",
      });
    }

    res.status(200).json({
      status: true,
      message: "Teacher delete student attendance",
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

const teacherMarksAttendance = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const { id } = req.params;
    const { attendancemark } = req.body;
    if (!teacherId) {
      return res.status(401).json({
        status: false,
        message: "Teacher Id not found",
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
        message: "Id length must be 24(char)",
      });
    }
    // console.log(id);
    const findcourse = await StudentCourse.findOne({ studentReferId: id });
    // console.log(findcourse.studentReferId.toString(), " ",findcourse._id.toString());
    const studentid = id;
    const courseid = findcourse._id.toString();
    // console.log(studentid + " " + courseid);
    if (!findcourse) {
      return res.status(401).json({
        status: false,
        message: "Student ReferId is not found",
      });
    }

    const createattendance = await StudentAttendance.create({
      studentReferId: studentid,
      studentCourseId: courseid,
      attendance: attendancemark,
    });

    res.status(200).json({
      status: true,
      message: "Attendance Marks By Teacher",
      data: createattendance,
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
  teacherViewAttend,
  teacherViewByAttendance,
  teacherViewAttendById,
  teacherUpdateByAttendance,
  teacherDeleteAttendance,
  teacherMarksAttendance,
};
