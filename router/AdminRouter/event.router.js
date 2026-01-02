const express = require("express");
const router = express.Router();
const admin = require("../../middleware/admin.middleware");
const { verifyToken } = require("../../middleware/authcookies.middleware");
const {
  createEvent,
  updateEvent,
  deleteEvent,
  viewEventById,
  viewEventAll,
  sendNotification,
} = require("../../controller/AdminController/event.controller");

router.post("/createevent", verifyToken, admin, createEvent);
router.put("/updateevent/:id", verifyToken, admin, updateEvent);
router.delete("/deleteevent/:id", verifyToken, admin, deleteEvent);
router.get("/viewEvent/:id", verifyToken, admin, viewEventById);
router.get("/viewEventall", verifyToken, admin, viewEventAll);
router.post("/sendnotification/:id", verifyToken, admin, sendNotification);

module.exports = router;
