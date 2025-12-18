const work = async (req, res) => {
  res.status(200).json({
    status: true,
    message: "Server Working.........",
  });
};

module.exports = { work };
