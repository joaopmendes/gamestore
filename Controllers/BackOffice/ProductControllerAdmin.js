const models = require("../../Models");
createProduct = async (name, category, type, price) => {
  try {
    const product = await models.Product.create({ name, category, price });
    return product || null;
  } catch (e) {
    return null;
  }
};
module.exports = {
  store: async (req, res) => {
    const { name, category, type, price } = req.body;

    const product = await createProduct(name, category, type, price);
    if (!product) return res.status(423).json({ errorMessage: "Product not created." });

    return res.status(201).json({ product });
  },
};
