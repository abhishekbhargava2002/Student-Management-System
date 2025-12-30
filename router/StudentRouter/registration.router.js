const express = require("express");
const router = express.Router();
// const { verifyToken } = require("../../middleware/auth.middleware");
const { verifyToken } = require("../../middleware/authcookies.middleware");
const {
  registration,
  login,
  profile,
  forgotPassword,
  verifyOtp,
  resetPassword,
  logout,
} = require("../../controller/StudentController/studentregistration.constroller");

router.post("/registration", registration);
router.post("/login", login);
router.get("/profile", verifyToken, profile);
router.post("/send-otp", verifyToken, forgotPassword);
router.post("/vertify-otp", verifyToken, verifyOtp); 
router.post("/resetpassword", verifyToken, resetPassword); 
router.post("/logout", verifyToken, logout);

module.exports = router;
