const Message = require("../../model/StudentModel/message.model");

const messageRevise = async (req, res) => {
  try {
    const adminId = req.user.userId;

    const messageData = await Message.findOne({ adminId });

    // If no message found
    if (!messageData) {
      return res.status(200).json({
        status: true,
        message: "The student has not sent any messages",
        data: [],
      });
    }

    // If message exists
    res.status(200).json({
      status: true,
      message: "Revise the message By Student",
      data: messageData,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const replyMessage = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({
        status: false,
        message: "Message is required",
      });
    }
    const find = await Message.findOne({ adminId });
    if (!find) {
      return res.status(200).json({
        status: true,
        message: "The student has not sent any messages",
        data: [],
      });
    }
    const findStudentId = find.studentId.toString();

    const create = await Message.create({
      adminId: adminId,
      studentId: findStudentId,
      message,
      role: "student",
    });

    res.status(200).json({
      status: true,
      message: "Send message to Student By Admin",
      data: create,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

module.exports = { messageRevise, replyMessage };
