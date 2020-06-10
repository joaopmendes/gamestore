const { Router } = require(`express`)
const routes = Router();
const multer = require('../Middlewares/MulterMiddleware')
const ProductControllerAdmin = require('../Controllers/BackOffice/ProductControllerAdmin')
const ensureAuth = require('../Middlewares/ensureAuth')
const ensureAdmin = require('../Middlewares/ensureAdmin')
routes.get('/', ProductControllerAdmin.index)
routes.put('/', ensureAuth, ensureAdmin, ProductControllerAdmin.store)
routes.post('/delete', ensureAuth, ensureAdmin, ProductControllerAdmin.remove)
routes.post('/', ensureAuth, ensureAdmin, multer.single("productImage"), ProductControllerAdmin.store)

module.exports = routes
