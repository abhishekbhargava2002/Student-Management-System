const Teacher = require("../../model/TeacherModel/teacher.model");
const Notification = require("../../model/AdminModel/notification.model");

const viewNotification = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const { type } = req.query;
    if (!teacherId) {
      return res.status(403).json({
        status: false,
        message: "Authication missing",
      });
    }
    if (type !== "Teacher" && type !== "All") {
      return res.status(401).json({
        status: false,
        message: "Only Teacher or All type Access only",
      });
    }
    const findTeacher = await Teacher.findById(teacherId);
    if (!findTeacher) {
      return res.status(403).json({
        status: false,
        message: "TeacherId is invalid",
      });
    }

    const findEvent = await Notification.find({ type });
    if (!findEvent) {
      return res.status(403).json({
        status: false,
        message: "Type not found",
      });
    }

    res.status(200).json({
      status: true,
      messaage: "View Event By Teacher",
      data: findEvent,
    });
  } catch (error) {
    console.log("Error: ", error);
    req.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

module.exports = { viewNotification };
