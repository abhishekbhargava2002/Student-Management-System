const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authcookies.middleware");
const teacher = require("../../middleware/teacher.middleware");
const {
  viewNotification,
} = require("../../controller/TeacherController/teachernotification.controller");

router.get("/viewevent", verifyToken, teacher, viewNotification);

module.exports = router;
