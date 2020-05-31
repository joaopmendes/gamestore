const { Router } = require(`express`)
const ensureAuth = require('../Middlewares/ensureAuth')

const routes = Router()
const OrderController = require('../Controllers/OrderController')
routes.post('/', ensureAuth, OrderController.createOrder)
routes.put('/', ensureAuth, OrderController.createOrder)
module.exports = routes
