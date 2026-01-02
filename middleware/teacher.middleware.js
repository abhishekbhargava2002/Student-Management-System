const teacher = (req, res, next) => {
  if (req.user.role !== "teacher") {
    return res.status(403).json({
      status: false,
      message: "Access denied — Teacher only",
    });
  }
  next();
};

module.exports = teacher;
