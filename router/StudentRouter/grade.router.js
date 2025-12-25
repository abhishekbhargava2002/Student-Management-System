const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authcookies.middleware");
const {
  studentViewGrade,
} = require("../../controller/StudentController/grade.controller");

router.get("/viewgrade", verifyToken, studentViewGrade);

module.exports = router;
