const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log(token);

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Token not found in cookies",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Invalid token",
    });
  }
};

module.exports = { verifyToken };
