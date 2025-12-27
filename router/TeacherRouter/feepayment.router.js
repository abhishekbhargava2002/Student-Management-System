const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authcookies.middleware");
const {
  viewfeepayment,
  viewFeePaymentByCourseName,
} = require("../../controller/TeacherController/feepayment.controller");

router.get("/feepayment", verifyToken, viewfeepayment);
router.get("/feepaymentbycourse/:id", verifyToken, viewFeePaymentByCourseName);

module.exports = router;
