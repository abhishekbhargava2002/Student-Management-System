const StudentCourse = require("../../model/StudentModel/student.model");
const Admin = require("../../model/AdminModel/admin.model");
const AdminNotification = require("../../model/AdminModel/adminnotification.model");
const { ObjectId } = require("bson");

//Course Management
const createCourse = async (req, res) => {
  try {
    const adminId = req.user.userId;
    if (!adminId) {
      return res.status(400).json({
        status: false,
        message: "Cookies missing",
      });
    }
    const { CourseId, CourseName, Batch, Address, DOB } = req.body;
    if (!CourseId || !CourseName || !Batch || !Address || !DOB) {
      return res.status(400).json({
        status: false,
        message: "All field are required",
      });
    }
    if (CourseId.length !== 5) {
      return res.status(400).json({
        status: false,
        message: "CourseId must be exactly 5 characters",
      });
    }
    if (!Address.Street || !Address.PostCode) {
      return res.status(400).json({
        status: false,
        message: "Complete address is required",
      });
    }
    //Create Student Id
    const id = new ObjectId();
    const createAdmin = await StudentCourse.create({
      StudentReferId: id,
      AdminReferId: adminId,
      CourseId,
      CourseName,
      Batch,
      Address,
      DOB,
    });
    await AdminNotification.create({
      adminReferId: adminId,
      message: `Admin create new course`,
    });

    res.status(200).json({
      status: true,
      message: "Create the Course by Admin",
      data: createAdmin,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const { id } = req.params;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Cookies missing",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }
    const { Address, DOB } = req.body;
    const studentfind = await StudentCourse.findOne({ _id: id });

    if (Address) {
      if (!Address.Street || !Address.PostCode) {
        return res.status(400).json({
          status: false,
          message: "Complete address is required",
        });
      } else {
        studentfind.Address.Street = Address.Street;
        studentfind.Address.PostCode = Address.PostCode;
      }
    }
    if (DOB) {
      studentfind.DOB = DOB;
    }
    await studentfind.save();

    await AdminNotification.create({
      adminReferId: adminId,
      message: `Admin update the course by Id: ${id}`,
    });

    res.status(200).json({
      status: true,
      message: "Update the Course by Admin",
      data: studentfind,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const { id } = req.params;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Cookies missing",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }
    const studentfind = await StudentCourse.findOneAndDelete({ _id: id });

    await AdminNotification.create({
      adminReferId: adminId,
      message: `Admin delete the course by Id: ${id}`,
    });

    res.status(200).json({
      status: true,
      message: "Delete the Course by Admin",
      data: studentfind,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const viewCourse = async (req, res) => {
  try {
    const adminId = req.user.userId;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Cookies missing",
      });
    }
    const viewCourse = await StudentCourse.find();

    await AdminNotification.create({
      adminReferId: adminId,
      message: `Admin see all course deatil`,
    });
    res.status(200).json({
      status: true,
      message: "View the Course details by Admin",
      data: viewCourse,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const viewCourseById = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const { id } = req.params;
    if (!adminId) {
      return res.status(401).json({
        status: false,
        message: "Cookies missing",
      });
    }
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id is required",
      });
    }
    const studentfind = await StudentCourse.findOne({ _id: id });

    await AdminNotification.create({
      adminReferId: adminId,
      message: `Admin see the deatil by Id: ${id}`,
    });

    res.status(200).json({
      status: true,
      message: "View the Course By Admin",
      data: studentfind,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  viewCourse,
  viewCourseById,
};
