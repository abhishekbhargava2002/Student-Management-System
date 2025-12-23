const express = require("express");
const router = express.Router();
// const { verifyToken } = require("../../middleware/auth.middleware");
const { verifyToken } = require("../../middleware/authcookies.middleware");

const {
  attendanceMark,
  attendanceView,
  attendanceupdate,
} = require("../../controller/StudentController/studentattendance.controller");

router.post("/attendancemark", verifyToken, attendanceMark);
router.get("/attendanceview", verifyToken, attendanceView);
router.put("/attendanceupdate", verifyToken, attendanceupdate);

module.exports = router;
