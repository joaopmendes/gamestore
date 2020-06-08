const { Router } = require(`express`)
const routes = Router()
const ensureAuth = require('../Middlewares/ensureAuth')
const ensureAdmin = require('../Middlewares/ensureAdmin')
const CategoryControllerAdmin = require('../Controllers/BackOffice/CategoryControllerAdmin')
routes.get('/', CategoryControllerAdmin.retrieveAll)
routes.post(
    '/delete',
    ensureAuth,
    ensureAdmin,
    CategoryControllerAdmin.retrieveAll
)
routes.post(
    '/',
    ensureAuth,
    ensureAdmin,
    CategoryControllerAdmin.createUpdateCategory
)
routes.put(
    '/',
    ensureAuth,
    ensureAdmin,
    CategoryControllerAdmin.createUpdateCategory
)
module.exports = routes
