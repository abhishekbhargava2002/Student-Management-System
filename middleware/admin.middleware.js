const admin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: false,
      message: "Access denied — Admin only",
    });
  }
  next();
};

module.exports = admin;
