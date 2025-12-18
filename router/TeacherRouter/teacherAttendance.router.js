const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authcookies.middleware");
const {
  teacherViewAttend,
  teacherViewByAttendance,
  teacherViewAttendById,
  teacherUpdateByAttendance,
} = require("../../controller/TeacherController/teacherattendance.controller");

router.get("/viewattendance", verifyToken, teacherViewAttend);
router.get("/viewattendance/attend", verifyToken, teacherViewByAttendance);
router.get("/viewattendance/:id", verifyToken, teacherViewAttendById);
router.put("/viewattendance/update/:id", verifyToken, teacherUpdateByAttendance);

module.exports = router;