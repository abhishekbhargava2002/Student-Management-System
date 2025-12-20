require("dotenv").config(); // Load .env

const express = require("express");
const app = express();
const port = 3000;
const home = require("./router/home.router");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const studentRouter = require("./router/StudentRouter/student.router");
const studentRegistration = require("./router/StudentRouter/registration.router");
const studentAttendance = require("./router/StudentRouter/studentattendance.router");
const teacher = require("./router/TeacherRouter/teacher.router");
const teacherCourse = require("./router/TeacherRouter/teacherCourse.router");
const teacherAttendance = require("./router/TeacherRouter/teacherAttendance.router");
const adminRouter = require("./router/AdminRouter/admin.router");
const adminCourseRouter = require("./router/AdminRouter/admincourse.router");
const adminAttendanceRouter = require("./router/AdminRouter/adminattendance.router");
const adminStudentRouter = require("./router/AdminRouter/adminstudent.router");
const adminTeacherRouter = require("./router/AdminRouter/adminteacher.router");

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
app.use("/student", studentRouter);
app.use("/student", studentRegistration);
app.use("/student", studentAttendance);
app.use("/teacher", teacher);
app.use("/teacher", teacherCourse);
app.use("/teacher", teacherAttendance);
app.use("/admin", adminRouter);
app.use("/admin", adminCourseRouter);
app.use("/admin", adminAttendanceRouter);
app.use("/admin", adminStudentRouter);
app.use("/admin", adminTeacherRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
