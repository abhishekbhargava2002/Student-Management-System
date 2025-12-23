const express = require("express");
const router = express.Router();
// const { verifyToken } = require("../../middleware/auth.middleware.js");
const { verifyToken } = require("../../middleware/authcookies.middleware");

const {
  createCourse,
  updateCourse, 
  deleteCourse,
  getCourse,
} = require("../../controller/StudentController/studentcourse.controller");

router.post("/create", verifyToken, createCourse);
router.put("/update", verifyToken, updateCourse); 
router.delete("/delete", verifyToken, deleteCourse);
router.get("/record", verifyToken, getCourse);

module.exports = router;
 