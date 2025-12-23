const express = require("express");
const router = express.Router();
// const { verifyToken } = require("../../middleware/auth.middleware");
const { verifyToken } = require("../../middleware/authcookies.middleware");
const {
  registration,
  login,
  profile,
  logout,
} = require("../../controller/StudentController/studentregistration.constroller");

router.post("/registration", registration);
router.post("/login", login);
router.get("/profile", verifyToken, profile);
router.post("/logout", verifyToken, logout);

module.exports = router; 
