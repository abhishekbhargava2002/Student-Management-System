const student = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "teacher") {
    return res.status(403).json({
      status: false,
      message: "Access denied — Student only",
    });
  }
  next();
};

module.exports = student;
