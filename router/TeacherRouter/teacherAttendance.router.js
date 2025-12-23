const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authcookies.middleware");
const {
  teacherViewAttend,
  teacherViewByAttendance,
  teacherViewAttendById,
  teacherUpdateByAttendance,
  teacherDeleteAttendance,
  teacherMarksAttendance,
} = require("../../controller/TeacherController/teacherattendance.controller");

router.get("/viewattendanceall", verifyToken, teacherViewAttend);
router.get("/viewattendance", verifyToken, teacherViewByAttendance);
router.get("/viewattendance/:id", verifyToken, teacherViewAttendById);
router.put("/updateattendance/:id", verifyToken, teacherUpdateByAttendance);
router.delete("/deleteattendance/:id", verifyToken, teacherDeleteAttendance);
router.post("/createattendance/:id", verifyToken, teacherMarksAttendance);

module.exports = router;
