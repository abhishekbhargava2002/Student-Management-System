const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authcookies.middleware");
const {
  viewNotification,
} = require("../../controller/StudentController/studentnotification.controller");

router.get("/viewevent", verifyToken, viewNotification);

module.exports = router;
