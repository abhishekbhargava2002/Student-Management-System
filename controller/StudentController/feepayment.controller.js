const FeePayment = require("../../model/StudentModel/feepayment.model");
const StudentRegistration = require("../../model/StudentModel/studentregistration.model");
const Fee = require("../../model/AdminModel/fee.model");

const payment = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const { courseName } = req.query;
    if (!studentId) {
      return res.status(401).json({
        status: false,
        message: "Authication missing",
      });
    }
    const existStudent = await StudentRegistration.findOne({ _id: studentId });
    if (!existStudent) {
      return res.status(403).json({
        status: false,
        message: "StudentId not found",
      });
    }
    if (!courseName) {
      return res.status(400).json({
        status: false,
        message: "Course Name is required",
      });
    }
    if (courseName !== "BTech" && courseName !== "MTech") {
      return res.status(400).json({
        status: false,
        message: "Course Name must be (BTech/MTech)",
      });
    }

    const existCourse = await Fee.findOne({ courseName: courseName });
    const courseFeeId = existCourse._id.toString();
    if (!existCourse) {
      return res.status(403).json({
        status: false,
        message: "Invalid",
      });
    }

    const { paymentStatus, paymentMode, paidAmount, paymentDate } = req.body;
    if (!paymentStatus || !paymentMode || !paidAmount) {
      return res.status(400).json({
        status: false,
        message: "All field required",
      });
    }

    const payment = await FeePayment.create({
      studentReferId: studentId,
      feeId: courseFeeId,
      paymentStatus,
      paymentMode,
      paidAmount,
      paymentDate,
    });

    res.status(200).json({
      status: true,
      message: "Payment Successful",
      data: payment,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

module.exports = { payment };
