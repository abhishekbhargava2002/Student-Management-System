require("dotenv").config(); // Load .env

const express = require("express");
const app = express();
const port = 3000;
const home = require("./router/home.router");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const studentRegistration = require("./router/StudentRouter/registration.router");
const studentCourseRouter = require("./router/StudentRouter/studentcourse.router");
const studentAttendance = require("./router/StudentRouter/studentattendance.router");
const teacher = require("./router/TeacherRouter/teacher.router");
const teacherCourse = require("./router/TeacherRouter/teacherCourse.router");
const teacherAttendance = require("./router/TeacherRouter/teacherAttendance.router");
const adminRouter = require("./router/AdminRouter/admin.router");
const adminCourseRouter = require("./router/AdminRouter/admincourse.router");
const adminAttendanceRouter = require("./router/AdminRouter/adminattendance.router");
const adminStudentRouter = require("./router/AdminRouter/adminstudent.router");
const adminTeacherRouter = require("./router/AdminRouter/adminteacher.router");
const teacherRecordGradeRouter = require("./router/TeacherRouter/grade.router");
const studentGradeRouter = require("./router/StudentRouter/grade.router");
const adminGradeRouter = require("./router/AdminRouter/grade.router");
const adminFeeRouter = require("./router/AdminRouter/fee.router");
const studentPaymentRouter = require("./router/StudentRouter/feepayment.router");
const teacherPaymentRouter = require("./router/TeacherRouter/feepayment.router");
const adminEventRouter = require("./router/AdminRouter/event.router");
const studentEventRouter = require("./router/StudentRouter/studentnotification.router");
const teacherEventRouter = require("./router/TeacherRouter/teachernotification.router");

app.use(express.json());
app.use(cookieParser());

main()
  .then(() => {
    console.log("Mongoose connection successful!");
  })
  .catch((err) => {
    console.log("Not working");
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

//Router's
app.use("/", home);
app.use("/student", studentRegistration);
app.use("/student", studentCourseRouter);
app.use("/student", studentAttendance);
app.use("/teacher", teacher);
app.use("/teacher", teacherCourse);
app.use("/teacher", teacherAttendance);
app.use("/admin", adminRouter);
app.use("/admin", adminCourseRouter);
app.use("/admin", adminAttendanceRouter);
app.use("/admin", adminStudentRouter);
app.use("/admin", adminTeacherRouter);
app.use("/teacher", teacherRecordGradeRouter);
app.use("/student", studentGradeRouter);
app.use("/admin", adminGradeRouter);
app.use("/admin", adminFeeRouter);
app.use("/student", studentPaymentRouter);
app.use("/teacher", teacherPaymentRouter);
app.use("/admin", adminEventRouter);
app.use("/student", studentEventRouter);
app.use("/teacher", teacherEventRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
