const db = require("mongoose");
const orderSchema = new db.Schema({
  user: { type: db.Schema.Types.ObjectId, ref: "user" },
  status: { type: String, required: true },
});

module.exports = db.model("order", orderSchema);
