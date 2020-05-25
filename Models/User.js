const db = require("mongoose");
const userSchema = new db.Schema({
  name: { type: String, required: false },
  email: { type: String, required: false },
  googleId: { type: String, required: false },
  password: { type: String, required: false },
  token: { type: String, default: "" },
  admin: { type: Boolean, default: false },
});

module.exports = db.model("user", userSchema);
