const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/authcookies.middleware");
const {
  registerEvent,
  viewEvent,
  deleteEvent,
} = require("../../controller/StudentController/eventregister.controller");

router.post("/registerevent/:eventid", verifyToken, registerEvent);
router.get("/viewregisterevent", verifyToken, viewEvent);
router.delete("/deleteevent", verifyToken, deleteEvent);

module.exports = router;
