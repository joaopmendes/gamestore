const { Router } = require(`express`)
const routes = Router()
const ProductControllerAdmin = require('../Controllers/BackOffice/ProductControllerAdmin')
const ensureAuth = require('../Middlewares/ensureAuth')
const ensureAdmin = require('../Middlewares/ensureAdmin')
routes.get('/', ProductControllerAdmin.index)
routes.put('/', ensureAuth, ensureAdmin, ProductControllerAdmin.store)
routes.post('/delete', ensureAuth, ensureAdmin, ProductControllerAdmin.remove)
routes.post('/', ensureAuth, ensureAdmin, ProductControllerAdmin.store)

module.exports = routes
