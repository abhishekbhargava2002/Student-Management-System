const express = require("express");
const router = express.Router();
const teacher = require("../../middleware/teacher.middleware");
const { verifyToken } = require("../../middleware/authcookies.middleware");
const {
  reviseMessage,
  replyToStudent,
} = require("../../controller/TeacherController/message.controller");

router.get("/revisemessage", verifyToken, teacher, reviseMessage);
router.post("/replymessage", verifyToken, teacher, replyToStudent);

module.exports = router;
