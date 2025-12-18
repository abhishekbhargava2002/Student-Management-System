const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authcookies.middleware");
const {
  createCourse,
  updateCourse,
  deleteCourse,
  viewCourse,
  viewCourseById,
} = require("../../controller/AdminController/admincourse.controller");
const admin = require("../../middleware/admin.middleware");

router.post("/create", verifyToken, admin, createCourse);
router.put("/update/:id", verifyToken, admin, updateCourse);
router.delete("/delete/:id", verifyToken, admin, deleteCourse);
router.get("/view", verifyToken, admin, viewCourse);
router.get("/view/:id", verifyToken, admin, viewCourseById);

module.exports = router;
