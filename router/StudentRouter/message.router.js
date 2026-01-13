const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authcookies.middleware");
const verifystudent = require("../../middleware/student.middleware");
const {
  sendMessage,
} = require("../../controller/StudentController/message.controller");

router.post("/sendmessage/:id", verifyToken, verifystudent, sendMessage);

module.exports = router;
