const express = require("express");
const router = express.Router();
const admin = require("../../middleware/admin.middleware");
const { verifyToken } = require("../../middleware/authcookies.middleware");
const {
  viewTeacherAll,
  viewTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../../controller/AdminController/adminteacher.controller");

router.get("/teacher", verifyToken, admin, viewTeacherAll);
router.get("/teacher/:id", verifyToken, admin, viewTeacherById);
router.post("/teacher/create", verifyToken, admin, createTeacher);
router.put("/teacher/update/:id", verifyToken, admin, updateTeacher);
router.delete("/teacher/delete/:id", verifyToken, admin, deleteTeacher);

module.exports = router;
