const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/auth.middleware");
const verifyByCookiesToken = require("../../middleware/authcookies.middleware");
 
const {
  attend,
  attendView,
  attendupdate,
} = require("../../controller/StudentController/studentattendance.controller");

router.post("/attend",verifyToken, attend); 
router.get("/attend/view", verifyToken, attendView);
router.put("/attend/update", verifyToken, attendupdate);

module.exports = router;
