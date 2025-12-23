const Teacher = require("../../model/TeacherModel/teacher.model");
const Student = require("../../model/StudentModel/studentcourse.model");
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
    const { courseName } = req.body;
    if (!courseName) {
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
    const studentFind = await Student.find({ courseName: courseName }).select(
      "-_id -createdAt -updatedAt -__v"
    );
    res.status(200).json({
      status: true,
      message: `View the detail By CourseName ${courseName}`,
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
    const { courseId, courseName, department } = req.body;
    if (!courseId || !courseName || !department) {
      return res.status(400).json({
        status: false,
        message: "All field are required",
      });
    }
    if (courseId.length !== 5) {
      return res.status(400).json({
        status: false,
        message: "CourseId must be exactly 5 characters",
      });
    }

    //Create Student Id
    const id = new ObjectId();
    // console.log(id.toHexString());
    const createStudent = await Student.create({
      studentReferId: id,
      teacherReferId: teacherId,
      courseId,
      courseName,
      department,
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
    const { department } = req.body;
    if (!teacherId) {
      return res.status(401).json({ 
        status: false,
        message: "Unauthorized",
      });
    }
    const find = await Student.findOne({ teacherReferId: teacherId });
    if (department) {
      find.department = department;
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
    const find = await Student.findOneAndDelete({ teacherReferId: teacherId });
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
