const Message = require("../../model/StudentModel/message.model");
const Teacher = require("../../model/TeacherModel/teacher.model");
const Admin = require("../../model/AdminModel/admin.model");

const sendMessage = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const { id } = req.params; //Admin or Teacher Id
    const { message, role } = req.body;
    if (id.length !== 24) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }
    if (!message || !role) {
      return res.status(400).json({
        status: false,
        message: "Message or Role is required",
      });
    }

    let findId;
    if (role === "admin") {
      findId = await Admin.findById(id);
    } else if (role === "teacher") {
      findId = await Teacher.findById(id);
    } else {
      return res.status(400).json({
        status: false,
        message: "Role does not found",
      });
    }

    if (!findId) {
      return res.status(403).json({
        status: false,
        message: "Id does not found",
      });
    }

    let create;
    if (role === "admin") {
      create = await Message.create({
        adminId: findId,
        studentId: studentId,
        message,
        role,
      });
    } else {
      create = await Message.create({
        teacherId: findId,
        studentId: studentId,
        message,
        role,
      });
    }

    res.status(200).json({
      status: true,
      message: `Message send By Student ID: ${studentId} to ${role}`,
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

module.exports = { sendMessage };
