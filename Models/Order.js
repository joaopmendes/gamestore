const db = require("mongoose");
const orderScheema = new db.Schema({
  user: { type: db.Schema.Types.ObjectId, ref: "user" },
  status: { type: String, required: true },
});

module.exports = db.model("order", orderScheema);
