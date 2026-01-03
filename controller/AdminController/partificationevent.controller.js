const EventRegister = require("../../model/StudentModel/eventregister.model");
const Admin = require("../../model/AdminModel/admin.model");

const viewAllPartification = async (req, res) => {
  try {
    const adminId = req.user.userId;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Authication Missing",
      });
    }

    const findAdmin = await Admin.findById(adminId);
    if (!findAdmin) {
      return res.status(403).json({
        status: false,
        message: "Admin not found",
      });
    }

    const findParification = await EventRegister.find().populate(
      "eventId studentId"
    );
    if (findParification.length === 0) {
      return res.status(200).json({
        status: true,
        message: "No participants found",
        data: [],
      });
    }

    res.status(200).json({
      status: true,
      message: "View all Partification By Admin",
      data: findParification,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

module.exports = { viewAllPartification };
