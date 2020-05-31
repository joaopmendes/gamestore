const models = require('../Models')
const { createError } = require('../helpers/helpers')

module.exports = {
    index: async (req, res, next) => {
        try {
            return res
                .status(200)
                .json({ products: await models.Product.find() })
        } catch (e) {
            return next(createError(423, 'Could not process your request.'))
        }
    },
}
