const express = require("express");
const router = express.Router();
const {
  teacherregistration,
  teacherLogin,
  teacherlogout,
} = require("../../controller/TeacherController/teacher.controller");
const { verifyToken } = require("../../middleware/authcookies.middleware");

router.post("/registration", teacherregistration);
router.post("/login", teacherLogin);
router.post("/logout", verifyToken, teacherlogout);

module.exports = router;