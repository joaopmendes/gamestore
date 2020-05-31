const { User, Cart, Address } = require('../../Models')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const bc = require('bcrypt')
const { createError } = require('../../helpers/helpers')

const createUser = async (name, email, pass) => {
    try {
        const identifier = uuid.v1()
        const password = await bc.hash(pass, 5)
        const token = jwt.sign({ identifier }, process.env.JWT_KEY, {
            expiresIn: '1h',
        })
        const cart = await Cart.create({ items: [], totalPrice: 0 })
        const user = await User.create({
            email,
            password,
            name,
            identifier,
            token,
            cart,
        })
        cart.owner = user
        await cart.save()
        return user
    } catch (e) {
        throw createError(500, 'Could not create user.')
    }
}

const updateUser = async (user, { cart, addresses, email, name }) => {
    //! Add items to cart if there is any
    if (cart && Array.isArray(cart)) {
        await user.clearCart()
        for (const id of cart) {
            try {
                await user.addToCart(id)
            } catch (e) {
                throw createError(
                    500,
                    'Error trying to add product to user cart.'
                )
            }
        }
    }

    if (addresses && Array.isArray(addresses)) {
        for (const address of addresses) {
            if (!address.roadName || !address.postalCode || !address.locality) {
                throw createError(
                    400,
                    'Was not possible to create address with the provided data.'
                )
            }
            try {
                const addressInstance = await new Address({
                    ...address,
                }).save()
                user.addresses.push(addressInstance)
            } catch (e) {
                throw createError(
                    400,
                    'Was not possible to create address with the provided data.'
                )
            }
        }
    }
    if (email) {
        user.email = email
    }
    if (name) {
        user.name = name
    }
    try {
        await user.save()
    } catch (e) {
        throw createError(500, 'Was not possible to save the changes to user.')
    }
}
module.exports = { updateUser, createUser }
