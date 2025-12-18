const express = require("express");
const router = express.Router();
const {
  viewattendance,
  viewAttendanceById,
  viewAttendanceAllStudentAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../../controller/AdminController/adminattendance.controller");
const { verifyToken } = require("../../middleware/authcookies.middleware");
const admin = require("../../middleware/admin.middleware");

router.get(
  "/viewattendance/viewall",
  verifyToken,
  admin,
  viewAttendanceAllStudentAttendance
);
router.get("/viewattendance", verifyToken, admin, viewattendance);
router.get("/viewattendance/:id", verifyToken, admin, viewAttendanceById);
router.post("/createattendance", verifyToken, admin, createAttendance);
router.put("/updateattendance/:id", verifyToken, admin, updateAttendance);
router.delete("/deleteattendance/:id", verifyToken, admin, deleteAttendance);

module.exports = router;
