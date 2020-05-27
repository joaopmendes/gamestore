const models = require("../Models");

module.exports = {
  index: async (req, res) => {
    try {
      const products = await models.Product.find();
      return res.status(200).json({ products });
    } catch (e) {
      return res.status(423).json({ errorMessage: "Could not process your request." });
    }
  },
};
