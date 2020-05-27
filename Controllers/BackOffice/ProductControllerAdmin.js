const models = require('../../Models')
const mongoose = require('mongoose')
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
    remove: async (req, res) => {
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
    },
    store: async (req, res) => {
        const { id, name, category, type, price } = req.body

        const product = await createUpdateProduct(
            id,
            name,
            category,
            type,
            price
        )
        console.log(product)
        if (!product)
            return res
                .status(423)
                .json({ errorMessage: 'Product not created.' })

        return res.status(201).json({ product })
    },
}
