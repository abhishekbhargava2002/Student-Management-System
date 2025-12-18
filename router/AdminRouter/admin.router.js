const express = require("express");
const router = express.Router();
const {
  login,
  logout,
} = require("../../controller/AdminController/admin.controller");
const { verifyToken } = require("../../middleware/authcookies.middleware");

router.post("/login", login);
router.post("/logout", verifyToken, logout);

module.exports = router;
