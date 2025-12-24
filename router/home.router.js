const express = require("express");
const router = express.Router();
const { work } = require("../controller/home.controller");

router.get("/work", work);

module.exports = router;
