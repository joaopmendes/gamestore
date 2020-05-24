const User = require("../Models/User");
module.exports = {
  register: (req, res) => {
    const { email, password, name } = req.body;
    if (!email) {
      return res.status(400).json({ errorMessage: "The field email is required." });
    }
    if (!password) {
      return res.status(400).json({ errorMessage: "The field password is required." });
    }
    if (!name) {
      return res.status(400).json({ errorMessage: "The field name is required." });
    }
  },
  login: (req, res) => {},
  profile: (req, res) => res.status(200).json(req.user),
};
