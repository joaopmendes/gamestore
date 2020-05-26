const db = require("mongoose");
const productScheema = new db.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = db.model("product", productScheema);
