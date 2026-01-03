const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authcookies.middleware");
const admin = require("../../middleware/admin.middleware");
const {
  viewAllPartification,
} = require("../../controller/AdminController/partificationevent.controller");

router.get("/viewallpartification", verifyToken, admin, viewAllPartification);

module.exports = router;
