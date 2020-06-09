const { Category } = require('../../Models')
const { createError } = require('../../helpers/helpers')
const mongoose = require('mongoose')

module.exports = {
    createUpdateCategory: async ({ name, _id }) => {
        console.log("----", name)
        if (!name) {
            throw createError(400, 'Invalid parameters.')
        }
        const id = _id || mongoose.Types.ObjectId()
        console.log("id", id)
        return await Category.findByIdAndUpdate(id, { name }, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
            useFindAndModify: true,
        }).exec()
    },
    deleteById: async (id) => {
        if (!id) {
            throw createError(400, 'Invalid parameters.')
        }
        await Category.findByIdAndDelete(id)
    },
}
