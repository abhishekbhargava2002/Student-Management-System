const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authcookies.middleware");
const {
  teacherView,
  teacherViewByCourseName,
  teacherCreateByStudent,
  teacherEditByStudent,
  teacherDeleteByStudent,
} = require("../../controller/TeacherController/teacherCourse.constroller");

router.get("/viewcourse", verifyToken, teacherView);
router.get("/viewcoursename", verifyToken, teacherViewByCourseName);
router.post("/createcourse", verifyToken, teacherCreateByStudent);
router.put("/editcourse", verifyToken, teacherEditByStudent);
router.delete("/deletecourse", verifyToken, teacherDeleteByStudent);

module.exports = router;
 