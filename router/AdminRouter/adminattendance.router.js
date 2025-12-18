const express = require("express");
const router = express.Router();
const {
  viewattendance,
} = require("../../controller/AdminController/adminattendance.controller");

router.get("/viewattendance", viewattendance);

module.exports = router;
