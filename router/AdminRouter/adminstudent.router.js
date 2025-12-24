const express = require("express");
const router = express.Router();
const {
  viewStudentAll,
  viewStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../../controller/AdminController/adminstudent.controller");
const admin = require("../../middleware/admin.middleware");
const { verifyToken } = require("../../middleware/authcookies.middleware");

router.get("/student", verifyToken, admin, viewStudentAll); //AllStudentFind
router.get("/student/:id", verifyToken, admin, viewStudentById); //StudentFindById
router.post("/student/create", verifyToken, admin, createStudent);
router.put("/student/update/:id", verifyToken, admin, updateStudent); //UpdateByStudentId
router.delete("/student/delete/:id", verifyToken, admin, deleteStudent); //deleteByStudentId

module.exports = router;
