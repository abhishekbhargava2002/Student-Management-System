const student = require("../model/StudentModel/studentregistration.model");
const { sendEmail } = require("../utils/mailserver");

const work = async (req, res) => {
  res.status(200).json({
    status: true,
    message: "Server Working.........",
  });
};

const uploadfile = async (req, res) => {
  try {
    const studentId = req.user.userId;
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }
    if (!studentId) {
      return res.status(400).json({
        status: false,
        message: "Authication missing",
      });
    }
    const find = await student.findOne({ _id: studentId });
    if (!find) {
      return res.status(403).json({
        status: false,
        message: "StudentId is invalid",
      });
    }
    find.image = req.file.path;
    await find.save();
    res.status(200).json({
      status: true,
      message: "Image Upload successfully",
      url: req.file.path, // Cloudinary URL
    });
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const mail = async (req, res) => {
  try {
    const studentId = req.user.userId;
    if (!studentId) {
      return res.status(400).json({
        status: false,
        message: "StudentId is required",
      });
    }
    const find = await student.findById(studentId);
    if (!find) {
      return res.status(403).json({
        status: false,
        message: "Invalid StudentId",
      });
    }
    const email = find.email;
    const emailText = `
      Hi ,
      Your student account has been successfully created.

      Here are your login details:
      Email: ${email}

      Please keep this information secure.
      Regards,
      Student Management System Team
    `;

    await sendEmail(email, "Your Student Account Details", emailText);

    res.status(200).json({
      status: true,
      message: "Mail Server Working",
    });
  } catch (error) {
    console.log("Error ", error);
    res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { work, uploadfile, mail };
