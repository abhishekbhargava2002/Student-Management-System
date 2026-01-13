const Message = require("../../model/StudentModel/message.model");

const reviseMessage = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const findId = await Message.findOne({ teacherId });
    if (!findId) {
      return res.status(200).json({
        status: true,
        message: "The student has not sent any messages",
        data: [],
      });
    }

    res.status(200).json({
      status: true,
      message: "Message revise by Student",
      data: findId,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const replyToStudent = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const find = await Message.findOne({ teacherId });

    if (!find) {
      return res.status(200).json({
        status: true,
        message: "The student has not sent any messages",
        data: [],
      });
    }
    //Body
    const stdId = find.studentId.toString();
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({
        status: false,
        message: "message is required",
      });
    }

    const replyMessage = await Message.create({
      teacherId: teacherId,
      studentId: stdId,
      message,
      role: "student",
    });

    res.status(200).json({
      status: true,
      message: "Reply to Student By Teacher",
      data: replyMessage,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

module.exports = { reviseMessage, replyToStudent };
