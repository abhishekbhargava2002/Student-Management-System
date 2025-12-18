const Teacher = require("../../model/TeacherModel/teacher.model");
const Student = require("../../model/StudentModel/student.model");
const { ObjectId } = require("bson");

//MANAGE COURSES
const teacherView = async (req, res) => {
  try {
    const auth = req.user.userId;
    if (!auth) {
      return res.status(400).json({
        status: false,
        message: "Cookies missing",
      });
    }
    const teacherFind = await Teacher.findOne({ _id: auth });
    if (!teacherFind) {
      return res.status(401).json({
        status: false,
        message: "UnAuthication",
      });
    }
    const studentCourse = await Student.find().select(
      "-_id -createdAt -updatedAt -__v"
    );

    res.status(200).json({
      status: true,
      message: "View the Course",
      data: studentCourse,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const teacherViewByCourseName = async (req, res) => {
  try {
    const teacher = req.user.userId;
    const { course } = req.body;
    if (!course) {
      return res.status(400).json({
        status: false,
        message: "Course Name is required",
      });
    }
    const teacherFind = await Teacher.findOne({ _id: teacher });
    if (!teacherFind) {
      return res.status(401)({
        status: false,
        message: "UnAuthication",
      });
    }
    const studentFind = await Student.find({ CourseName: course }).select(
      "-_id -createdAt -updatedAt -__v"
    );
    res.status(200).json({
      status: true,
      message: `View the detail By CourseName ${course}`,
      data: studentFind,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const teacherCreateByStudent = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    if (!teacherId) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
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
    console.log(id.toHexString());
    const createStudent = await Student.create({
      StudentReferId: id,
      TeacherReferId: teacherId,
      CourseId,
      CourseName,
      Batch,
      Address: {
        Street: Address.Street,
        PostCode: Address.PostCode,
      },
      DOB,
    });

    res.status(200).json({
      status: true,
      message: "Create a Student",
      data: createStudent,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const teacherEditByStudent = async function Edit(req, res) {
  try {
    const teacherId = req.user.userId;
    if (!teacherId) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }
    const { DOB, Address } = req.body;
    const find = await Student.findOne({ StudentReferId: teacherId });
    if (DOB) {
      find.DOB = DOB;
    }

    if (Address) {
      if (!Address.Street || !Address.PostCode) {
        return res.status(400).json({
          status: false,
          message: "Complete address is required",
        });
      } else {
        find.Address.Street = Address.Street;
        find.Address.PostCode = Address.PostCode;
      }
    }

    await find.save();
    res.status(200).json({
      status: true,
      message: `Edit the Student Profile By TeacherId ${teacherId}`,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

const teacherDeleteByStudent = async (req, res) => {
  try {
    const teacherId = req.user.userId;
    if (!teacherId) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }
    const find = await Student.findOneAndDelete({ StudentReferId: teacherId });
    res.status(200).json({
      status: false,
      message: `Delete By Teacher of Id: ${teacherId}`,
      data: find,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status.json({
      status: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  teacherView,
  teacherViewByCourseName,
  teacherCreateByStudent,
  teacherEditByStudent,
  teacherDeleteByStudent,
};
