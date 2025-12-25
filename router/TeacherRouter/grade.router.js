const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authcookies.middleware");
const {
  createGrade,
  updateGrade,
  deleteGrade,
  getGradeById,getGradeAll
} = require("../../controller/TeacherController/teachergrade.controller");

router.post("/creategrade/:id", verifyToken, createGrade);
router.put("/updategrade/:id", verifyToken, updateGrade);
router.delete("/deletegrade/:id", verifyToken, deleteGrade);
router.get("/getgrade/:id", verifyToken, getGradeById);
router.get("/getgradeall", verifyToken, getGradeAll);

module.exports = router;
