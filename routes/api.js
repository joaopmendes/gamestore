const { Router } = require(`express`)
const models = require('../Models')
// const ensureAuth = require("../Middlewares/ensureAuth");
const routes = Router()

routes.get('/teste', async (req, res) => {
    const productId = '5ecd98ff8d01e946848ee480'
    const userId = '5ecd964fcae2ff3fdc0111b1'
    const user = await models.User.findById(userId)
    await user.addToCart(productId)
    return res.json('test rooute')
})
//* User Router
routes.use('/users', require('./user'))
routes.use('/products', require('./product'))
routes.use('/orders', require('./order'))
module.exports = routes
