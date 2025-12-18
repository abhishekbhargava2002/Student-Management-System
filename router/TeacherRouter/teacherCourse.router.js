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
router.get("/viewcourse/bycoursename", verifyToken, teacherViewByCourseName);
router.post("/viewcourse/createstudent", verifyToken, teacherCreateByStudent);
router.put("/viewcourse/editstudent", verifyToken, teacherEditByStudent);
router.delete("/viewcourse/deletestudent", verifyToken, teacherDeleteByStudent);

module.exports = router;
