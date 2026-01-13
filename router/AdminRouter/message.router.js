const express = require("express");
const router = express.Router();
const admin = require("../../middleware/admin.middleware");
const { verifyToken } = require("../../middleware/authcookies.middleware");
const {
  messageRevise,
  replyMessage,
} = require("../../controller/AdminController/message.controlller");

router.get("/revisemessage", verifyToken, admin, messageRevise);
router.post("/replymessage", verifyToken, admin, replyMessage);

module.exports = router;
