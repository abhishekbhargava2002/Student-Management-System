const Fee = require("../../model/AdminModel/fee.model");

const createFeeStructure = async (req, res) => {
  try {
    const adminId = req.user?.userId;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Authentication missing",
      });
    }
    const {
      courseName,
      tuitionFee,
      examinationFee,
      transportFee = 0,
      activityFee = 0,
      libraryFee,
      labFee,
      totalFee,
    } = req.body;

    if (
      courseName == null ||
      tuitionFee == null ||
      examinationFee == null ||
      libraryFee == null ||
      labFee == null ||
      totalFee == null
    ) {
      return res.status(400).json({
        status: false,
        message: "All required fields must be provided",
      });
    }

    // prevent duplicate course fee
    const exists = await Fee.findOne({ courseName });
    if (exists) {
      return res.status(409).json({
        status: false,
        message: `Fee already defined for ${courseName}`,
      });
    }

    const fee = await Fee.create({
      courseName,
      tuitionFee,
      examinationFee,
      transportFee,
      activityFee,
      libraryFee,
      labFee,
      totalFee,
    });

    res.status(201).json({
      status: true,
      message: `Creating fee structure for course: ${courseName}`,
      data: fee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const updateFeeSturcture = async (req, res) => {
  try {
    const adminId = req.user?.userId;
    const { course } = req.query;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Authentication missing",
      });
    }
    const exist = await Fee.findOne({ courseName: course });
    if (!exist) {
      return res.status(401).json({
        status: false,
        message: "Course name must be (BTech/MTech)",
      });
    }
    const {
      tuitionFee,
      examinationFee,
      transportFee = 0,
      activityFee = 0,
      libraryFee,
      labFee,
      totalFee,
    } = req.body;

    if (tuitionFee) {
      exist.tuitionFee = tuitionFee;
    }
    if (examinationFee) {
      exist.examinationFee = examinationFee;
    }
    if (transportFee) {
      exist.transportFee = transportFee;
    }
    if (activityFee) {
      exist.activityFee = activityFee;
    }
    if (libraryFee) {
      exist.libraryFee = libraryFee;
    }
    if (labFee) {
      exist.labFee = labFee;
    }
    if (totalFee) {
      exist.totalFee = totalFee;
    }

    await exist.save();
    res.status(200).json({
      status: true,
      message: "Update fee structure",
      data: exist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const deleteFeeSturcture = async (req, res) => {
  try {
    const adminId = req.user?.userId;
    const { course } = req.query;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Authentication missing",
      });
    }
    const find = await Fee.findOneAndDelete({ courseName: course });
    if (!find) {
      return res.status(403).json({
        status: false,
        message: "Course Name is not found",
      });
    }

    res.status(200).json({
      status: true,
      message: `Delete Fee structure By CourseName: ${course}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const viewFeeSturcture = async (req, res) => {
  try {
    const adminId = req.user?.userId;
    const { course } = req.query;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Authentication missing",
      });
    }
    if (course !== "BTech" && course !== "MTech") {
      return res.status(401).json({
        status: false,
        message: "Must be (BTech/MTech)",
      });
    }
    const find = await Fee.findOne({ courseName: course });
    if (!find) {
      return res.status(403).json({
        status: false,
        message: "Course Name is not found",
      });
    }
    res.status(200).json({
      status: true,
      message: `View detail by CourseName: ${course}`,
      data: find,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createFeeStructure,
  updateFeeSturcture,
  deleteFeeSturcture,
  viewFeeSturcture,
};
