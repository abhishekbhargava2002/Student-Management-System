const FeePayment = require("../../model/StudentModel/feepayment.model");

const viewfeepayment = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const role = req.user.role;
    if (!teacherId) {
      return res.status(401).json({
        status: false,
        message: "Authication missing",
      });
    }
    if (role !== "teacher") {
      return res.status(403).json({
        status: false,
        message: "Teacher only access",
      });
    }
    const find = await FeePayment.find();
    res.status(200).json({
      status: true,
      message: "View payment list of Student",
      data: find,
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const viewFeePaymentByCourseName = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    const role = req.user.role;
    if (!teacherId) {
      return res.status(401).json({
        status: false,
        message: "Authication missing",
      });
    }
    if (role !== "teacher") {
      return res.status(403).json({
        status: false,
        message: "Teacher only access",
      });
    }
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }
    const findStudent = await FeePayment.findOne({ studentReferId: id });
    if (!findStudent) {
      return res.status(403).json({
        status: false,
        message: "StudentId not found",
      });
    }

    res.status(200).json({
      status: true,
      message: `View payment list of Student By CourseName: ${id}`,
      data: findStudent,
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

module.exports = { viewfeepayment, viewFeePaymentByCourseName };
