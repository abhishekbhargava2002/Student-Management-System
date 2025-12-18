const express = require("express");
const router = express.Router();
const { work } = require("../controller/home.controller");

router.get("/", work);

module.exports = router;
