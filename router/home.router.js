const express = require("express");
const router = express.Router();
const upload = require("../utils/multerCloudinary");
const { verifyToken } = require("../middleware/authcookies.middleware");
const { work, uploadfile, mail } = require("../controller/home.controller");

router.get("/work", work);
router.post("/upload", upload.single("image"), verifyToken, uploadfile);
router.post("/mail", verifyToken, mail);

module.exports = router;
