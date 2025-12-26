const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authcookies.middleware");
const {
  createFeeStructure,
  updateFeeSturcture,
  deleteFeeSturcture,
  viewFeeSturcture,
} = require("../../controller/AdminController/fee.controller");
const admin = require("../../middleware/admin.middleware");

router.post("/createfee", verifyToken, admin, createFeeStructure);
router.put("/updatefee", verifyToken, admin, updateFeeSturcture);
router.delete("/deletefee", verifyToken, admin, deleteFeeSturcture);
router.get("/viewfee", verifyToken, admin, viewFeeSturcture);

module.exports = router;
