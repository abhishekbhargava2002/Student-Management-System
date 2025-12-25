const Grade = require("../../model/StudentModel/grade.model");

const adminViewGrade = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const role = req.user.role;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Authication is required",
      });
    }
    if (role !== "admin") {
      return res.status(403).json({
        status: false,
        message: "Only admin access",
      });
    }
    const findAdmin = await Grade.find();

    res.status(200).json({
      status: true,
      message: `Student view detail By Id: ${adminId}`,
      data: findAdmin,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const adminViewGradeById = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const role = req.user.role;
    const { id } = req.params;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Authication is required",
      });
    }
    if (role !== "admin") {
      return res.status(403).json({
        status: false,
        message: "Only admin access",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }
    const findGrade = await Grade.findOne({ gradeId: id }).select(
      "-_id -createdAt -updatedAt -__v"
    );
    res.status(200).json({
      status: true,
      message: `Admin view by GradeId: ${id}`,
      data: findGrade,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

module.exports = { adminViewGrade, adminViewGradeById };
