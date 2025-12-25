const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authcookies.middleware");
const {
  adminViewGrade,adminViewGradeById
} = require("../../controller/AdminController/grade.controller");

router.get("/viewgrade", verifyToken, adminViewGrade);
router.get("/viewgrade/:id", verifyToken, adminViewGradeById);


module.exports = router;
