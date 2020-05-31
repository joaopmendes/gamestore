const Validator = require('./Validator')
const { Cart, Order } = require('../../Models')
module.exports = {
    createOrder: async (user, input) => {
        await Validator.CreateOrderInput(user, input)
        const currentCart = user.cart._id
        //* reset cart
        user.cart = await Cart.create({
            items: [],
            totalPrice: 0,
            owner: user._id,
        })

        const order = await Order.create({
            user: user._id,
            currentCart,
            status: 'PENDING',
            ...input,
        })
        user.orders.push(order)
        user.save()

        return order
    },
}
