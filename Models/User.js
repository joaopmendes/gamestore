const db = require("mongoose");
const models = require(".");
const userSchema = new db.Schema({
  identifier: { type: String, required: true },
  name: { type: String, required: false },
  email: { type: String, required: false },
  password: { type: String, required: false },
  token: { type: String, default: "" },
  admin: { type: Boolean, default: false },
  cart: { type: db.Schema.Types.ObjectId, ref: "cart" },
});

//! TODO: develop methods to interact with cart
userSchema.methods.addToCart = async function (productId) {
  console.log("[USER > addToCart] Add to cart of " + this.email);
  let product;
  try {
    product = await this.model("product").findById(productId);
  } catch (e) {
    console.log(`[USER > addToCart] Error Finding Product ${productId}: ${e}`);
  }
  let cart;
  try {
    cart = await this.model("cart").findById(this.cart);
  } catch (e) {
    console.log(`[USER > addToCart] Error Finding Cart ${this.cart}: ${e}`);
  }
  // await cart.addProduct(product);
  cart.removeProduct(product);
};

userSchema.methods.removeFromCart = async function (productId) {
  console.log("[USER > removeFromCart] Add to cart of " + this.email);
  let product;
  try {
    product = await this.model("product").findById(productId);
  } catch (e) {
    console.log(`[USER > removeFromCart] Error Finding Product ${productId}: ${e}`);
  }
  let cart;
  try {
    cart = await this.model("cart").findById(this.cart);
  } catch (e) {
    console.log(`[USER > removeFromCart] Error Finding Cart ${this.cart}: ${e}`);
  }
  cart.removeProduct(product);
};
module.exports = db.model("user", userSchema);
