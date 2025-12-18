const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authcookies.middleware");
const {
  createCourse,
  updateCourse,
  deleteCourse,
  viewCourse,viewCourseById
} = require("../../controller/AdminController/admincourse.controller");

router.post("/create", verifyToken, createCourse);
router.put("/update/:id", verifyToken, updateCourse);
router.delete("/delete/:id", verifyToken, deleteCourse);
router.get("/view", verifyToken, viewCourse);
router.get("/view/:id", verifyToken, viewCourseById);


module.exports = router;
