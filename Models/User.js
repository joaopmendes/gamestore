const db = require("mongoose");
const userSchema = new db.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, default: "" },
  admin: { type: Boolean, default: false },
});

module.exports = db.model("user", userSchema);
