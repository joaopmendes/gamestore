module.exports = async (req, res, next) => {
  if (!req.user.admin) {
    return res.status(403).json({ errorMessage: "Not authorized" });
  }
  return next();
};
