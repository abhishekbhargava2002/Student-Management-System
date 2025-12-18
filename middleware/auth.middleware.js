const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(400).json({
        status: false,
        message: "Token is required",
      });
    }
    const token = authHeader.split(" ")[1];
    req.token = token;
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Invalid Token",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
}

module.exports = { verifyToken };
