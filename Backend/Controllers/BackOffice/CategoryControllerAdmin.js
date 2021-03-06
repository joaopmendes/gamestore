const models = require('../../Models')
const { createError } = require('../../helpers/helpers')
const CategoryService = require('../../Services/CategoryService/CategoryService')

module.exports = {
    retrieveAll: async (req, res, next) => {
        try {
            return res
                .status(200)
                .json({ categories: await models.Category.find() })
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
            console.log("ids", ids)
            console.log(idsParsed)
            for (const id of idsParsed) {
                await CategoryService.deleteById(id)
            }
            return res.status(200).json({ message: 'Deleted' })
        } catch (e) {
            console.log(e);
            return next(createError(500, 'Unable to remove ids'))
        }
    },
    createUpdateCategory: async (req, res, next) => {
        try {
            const category = await CategoryService.createUpdateCategory(
                req.body
            )
            console.log("category", category);
            return res.status(200).json({ category })
        } catch (e) {
            return next(e)
        }
    },
}
