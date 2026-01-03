const Notification = require("../../model/AdminModel/notification.model");

const viewNotification = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const role = req.user.role;
    const { type } = req.query;
    if (!studentId) {
      return res.status(401).json({
        status: false,
        message: "Authication Missing",
      });
    }
    if (role === "admin" || role === "teacher") {
      return res.status(403).json({
        status: false,
        message: "Student access only",
      });
    }
    if (type === "Teacher") {
      return res.status(401).json({
        status: false,
        message: "Teacher type not access",
      });
    }
    const viewEvent = await Notification.find({ type }).populate(
      "eventId"
    );

    res.status(200).json({
      status: true,
      message: "View Notification By Student",
      data: viewEvent,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

module.exports = { viewNotification };
