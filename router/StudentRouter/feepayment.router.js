const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authcookies.middleware");
const {
  payment,
} = require("../../controller/StudentController/feepayment.controller");

router.post("/payment", verifyToken, payment);

module.exports = router;
