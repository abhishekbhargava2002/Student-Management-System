const Student = require("../../model/StudentModel/student.model");

const createStudent = async (req, res) => {
  try {
    const exist = req.user.userId;
    const { StudentReferId, CourseId, CourseName, Batch, Address, DOB } =
      req.body;
  
    if (!CourseId || !CourseName || !Batch || !DOB) { 
      return res.status(400).json({
        status: false,
        message: "All field is required",
      });
    }
 
    const create = await Student.create({
      StudentReferId: exist,
      CourseId,
      CourseName,
      Batch,
      Address: { Street: Address.Street, PostCode: Address.PostCode },
      DOB,
    });

    res.status(200).json({
      status: true,
      message: "Create Successful",
      data: create,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error",
      message: error.message,
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const auth = req.user.userId;
    const { Address, DOB } = req.body;
    if (!auth) {
      return res.status(400).json({
        status: false,
        message: "Authication header missing",
      });
    }
    const exist = await Student.findOne({ StudentReferId: auth });
    if (!exist) {
      return res.status(403).json({
        status: false,
        message: "Student not existing",
      });
    }
    if (Address) exist.Address = Address;
    if (DOB) exist.DOB = DOB;

    await exist.save();
    res.status(200).json({
      status: true,
      message: "Update Successful",
      data: exist,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error",
      message: error.message,
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const auth = req.user.userId;
    if (!auth) {
      return res.status(400).json({
        status: false,
        message: "Authication header missing",
      });
    }
    const exist = await Student.findOneAndDelete({ StudentReferId: auth });
    if (!exist) {
      return res.status(403).json({
        status: false,
        message: "Student Id is invalid",
      });
    }
    res.status(200).json({
      status: true,
      message: "Delete Succesful",
      data: exist,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const getRecord = async (req, res) => {
  try {
    const auth = req.user.userId;
    if (!auth) {
      return res.status(400).json({
        status: false,
        message: "Authication header missing",
      });
    }
    const find = await Student.findOne({ StudentReferId: auth }).populate(
      "StudentReferId"
    );
    if (!find) {
      return res.status(403).json({
        status: false,
        message: "Not existing",
      });
    }
    res.status(200).json({
      status: true,
      message: "Fetched Successful",
      data: find,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
  getRecord,
};
