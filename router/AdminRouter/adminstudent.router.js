const express = require("express");
const router = express.Router();
const {
  viewStudentAll,
  viewStudentById,
} = require("../../controller/AdminController/adminstudent.controller");
const admin = require("../../middleware/admin.middleware");
const { verifyToken } = require("../../middleware/authcookies.middleware");

router.get("/student", verifyToken, viewStudentAll);
router.get("/student/:id", verifyToken, viewStudentById);

module.exports = router;
