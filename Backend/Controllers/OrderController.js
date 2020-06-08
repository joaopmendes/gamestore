const OrderServices = require('../Services/OrderService/OrderService')
module.exports = {
    createOrder: async (req, res, next) => {
        try {
            const order = await OrderServices.createOrder(req.user, req.body)
            return res.status(200).json({ order })
        } catch (e) {
            return next(e)
        }
    },
}
