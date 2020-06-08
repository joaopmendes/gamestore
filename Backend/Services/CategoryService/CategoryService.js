const { Category } = require('../../Models')
const { createError } = require('../../helpers/helpers')
const mongoose = require('mongoose')

module.exports = {
    createUpdateCategory: async ({ name, _id }) => {
        if (!name) {
            throw createError(400, 'Invalid parameters.')
        }
        const id = _id || mongoose.Types.ObjectId()

        return await Category.findByIdAndUpdate(id, { name }).exec()
    },
    deleteById: async (id) => {
        if (!id) {
            throw createError(400, 'Invalid parameters.')
        }
        await Category.findByIdAndDelete(id)
    },
}
