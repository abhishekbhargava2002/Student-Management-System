const Attendance = require("../../model/StudentModel/attendanceTable.model");
const studentCourse = require("../../model/StudentModel/studentcourse.model");

const attendanceMark = async (req, res) => {
  try {
    const user = req.user.userId;
    const { attendance } = req.body;
    if (!user) {
      return res.status.json({
        status: false,
        message: "Authentication header missing",
      });
    }
    if (!attendance) {
      return res.status(400).json({
        status: false,
        message: "Attendance is required (Present/Absent)",
      });
    }
    const findstudentId = await studentCourse.findOne({
      studentReferId: user,
    });

    // FIX: student not found
    if (!findstudentId) {
      return res.status(404).json({
        status: false,
        message: "StudentId not found",
      });
    }
    const findstudentRegistrationId = findstudentId.studentReferId.toString();
    if (findstudentRegistrationId !== user) {
      return res.status(403).json({
        status: false,
        message: "Invalid studentId! Try again",
      });
    }
    // console.log(user);
    // console.log(findstudentcourseId._id.toString());
    // console.log(findstudentRegistrationId);

    const createAttendance = await Attendance.create({
      studentReferId: user,
      studentCourseId: findstudentId._id.toString(),
      attendance,
    });

    const record = await Attendance.findById(createAttendance._id).populate(
      "studentReferId studentCourseId"
    );

    res.status(200).json({
      status: true,
      message: "Attendance is marked",
      data: record,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const attendanceView = async (req, res) => {
  try {
    const user = req.user.userId;
    if (!user) {
      return res.status.json({
        status: false,
        message: "Authentication header missing",
      });
    }
    if (user.length !== 24) {
      return res.status(403).json({
        status: false,
        message: "Authentication is invalid",
      });
    }

    const find = await Attendance.find({ studentReferId: user })
      .populate({ path: "studentReferId", select: "Name" })
      .populate({ path: "studentCourseId", select: "courseId courseName department" });

    // const studentRefer = req.user.userId;
    // console.log(req.user);
    // console.log(studentRefer);
    // console.log(find.studentCourseId._id.toString());

    if (!find) {
      return res.status(403).json({
        status: false,
        message: `Not existing this Id:${auth}`,
      });
    }

    res.status(200).json({
      status: true,
      message: "Record data fetched Successfully",
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

const attendanceupdate = async (req, res) => {
  try {
    const user = req.user.userId;
    const { attendance } = req.body;
    if (!user) {
      return res.status.json({
        status: false,
        message: "Authentication header missing",
      });
    }
    if (user.length !== 24) {
      return res.status(403).json({
        status: false,
        message: "UnAuthentication",
      });
    }
    const find = await Attendance.findOne({ studentReferId: user });
    if (!find) {
      res.status(400).json({
        status: false,
        message: `Not existing this Id: ${auth}`,
      });
    }
    find.attendance = attendance;
    await find.save();

    res.status(200).json({
      status: true,
      message: "Update the Attendance successful",
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

module.exports = { attendanceMark, attendanceView, attendanceupdate };