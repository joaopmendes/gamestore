const { Router } = require(`express`)
const routes = Router()
const ProductController = require('../Controllers/ProductController')
const ProductControllerAdmin = require('../Controllers/BackOffice/ProductControllerAdmin')
routes.get('/', ProductController.index)
routes.post('/update', ProductControllerAdmin.store)
routes.post('/delete', ProductControllerAdmin.remove)
routes.post('/', ProductControllerAdmin.store)

module.exports = routes
