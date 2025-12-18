const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/auth.middleware.js");

const {
  createStudent,
  updateStudent, 
  deleteStudent,
  getRecord,
} = require("../../controller/StudentController/student.controller");

router.post("/create", verifyToken, createStudent);
router.put("/update", verifyToken, updateStudent); 
router.delete("/delete", verifyToken, deleteStudent);
router.get("/record", verifyToken, getRecord);

module.exports = router;
 