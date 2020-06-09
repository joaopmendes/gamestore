const models = require('../../Models')
const mongoose = require('mongoose')
const { createError } = require('../../helpers/helpers')
const createUpdateProduct = async (
    id = mongoose.Types.ObjectId(),
    name,
    categories,
    type,
    price,
    console
) => {
    for (const categoryId of categories) {
        try {
            await models.Category.findById(categoryId).exec()
        } catch (e) {
            throw createError(404, 'Category Not Found.')
        }
    }
    return await models.Product.findByIdAndUpdate(
        id,
        { name, categories, type, price, console },
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
    index: async (req, res, next) => {
        try {
            return res
                .status(200)
                .json({ products: await models.Product.find() })
        } catch (e) {
            return next(createError(423, 'Could not process your request.'))
        }
    },
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
            const { id, name, categories, type, price, console } = req.body

            const product = await createUpdateProduct(
                id,
                name,
                categories,
                type,
                price,
                console
            )

            return res.status(201).json({ product })
        } catch (e) {
            return next(createError(500, 'Unable to remove ids'))
        }
    },
}
