const express = require("express");
const router = express.Router();
const {
  viewattendance,
  viewAttendanceById,
  viewAttendanceAllStudentAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,deleteAttendanceByStudent
} = require("../../controller/AdminController/adminattendance.controller");
const { verifyToken } = require("../../middleware/authcookies.middleware");
const admin = require("../../middleware/admin.middleware");

router.get(
  "/viewattendanceall",
  verifyToken,
  admin,
  viewAttendanceAllStudentAttendance
);
router.get("/viewattendance", verifyToken, admin, viewattendance);//FindByAttendance(Present/Absent)
router.get("/viewattendance/:id", verifyToken, admin, viewAttendanceById);//FindtheAttendanceByStudentId
router.post("/createattendance/:id", verifyToken, admin, createAttendance);
router.put("/updateattendance/:id", verifyToken, admin, updateAttendance);
router.delete("/deleteattendance/:id", verifyToken, admin, deleteAttendance);
router.delete("/deleteattendance/record/:id", verifyToken, admin, deleteAttendanceByStudent);//DeleteAllInformationInDataBase

module.exports = router;
