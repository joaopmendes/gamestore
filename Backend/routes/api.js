const { Router } = require(`express`)
const routes = Router()

//* User Router
routes.use('/users', require('./user'))
routes.use('/products', require('./product'))
routes.use('/orders', require('./order'))
routes.use('/categories', require('./category'))
module.exports = routes
