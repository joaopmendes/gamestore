const models = require('../../Models')
const mongoose = require('mongoose')
const { createError } = require('../../helpers/helpers')
const createUpdateProduct = async (
    id = mongoose.Types.ObjectId(),
    name,
    category,
    type,
    price
) => {
    return await models.Product.findByIdAndUpdate(
        id,
        { name, category, type, price },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
            useFindAndModify: true,
        }
    ).exec()
}
const deleteProductById = async (id) => {
    return await models.Product.findByIdAndDelete(id || null).exec()
}
module.exports = {
    remove: async (req, res, next) => {
        try {
            const { ids } = req.body
            let idsParsed = []
            if (!Array.isArray(ids)) {
                idsParsed.push(ids)
            } else {
                idsParsed = ids
            }
            for (const id of idsParsed) {
                await deleteProductById(id)
            }
            return res.status(200).json({ message: 'Deleted' })
        } catch (e) {
            return next(createError(500, 'Unable to remove ids'))
        }
    },
    store: async (req, res, next) => {
        try {
            const { id, name, category, type, price } = req.body

            const product = await createUpdateProduct(
                id,
                name,
                category,
                type,
                price
            )

            return res.status(201).json({ product })
        } catch (e) {
            return next(createError(500, 'Unable to remove ids'))
        }
    },
}
