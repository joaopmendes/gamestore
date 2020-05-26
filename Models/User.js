const db = require("mongoose");
const userSchema = new db.Schema({
  identifier: { type: String, required: true },
  name: { type: String, required: false },
  email: { type: String, required: false },
  password: { type: String, required: false },
  token: { type: String, default: "" },
  admin: { type: Boolean, default: false },
});

module.exports = db.model("user", userSchema);
