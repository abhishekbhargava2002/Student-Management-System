const Admin = require("../../model/AdminModel/admin.model");
const AdminNotification = require("../../model/AdminModel/adminnotification.model");
const StudentAttendance = require("../../model/StudentModel/attendanceTable.model");

//MANAGE ATTENDANCE

const viewattendance = async (req, res) => {
  try {
    res.status(200).json({
      status: true,
      message: "View the attendance by Admin",
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

module.exports = { viewattendance };
