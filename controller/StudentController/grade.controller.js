const Grade = require("../../model/StudentModel/grade.model");

const studentViewGrade = async (req, res) => {
  try {
    const studentId = req.user.userId;
    if (!studentId) {
      return res.status(401).json({
        status: false,
        message: "Authication is required",
      });
    }
    const findRecord = await Grade.findOne({ studentId: studentId }).select(
      "-_id -createdAt -updatedAt -__v"
    );
    if (!findRecord) {
      return res.status(401).json({
        status: false,
        message: "Id is invalid",
      });
    }
    res.status(200).json({
      status: true,
      message: `Student view detail By Id: ${studentId}`,
      data: findRecord,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

module.exports = { studentViewGrade };
