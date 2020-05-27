const { User, Cart, Product, Address } = require('../Models')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const bc = require('bcrypt')
const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email })
        return user || null
    } catch (err) {
        return null
    }
}
const createUser = async (name, email, pass) => {
    const identifier = uuid.v1()
    let password
    try {
        password = await bc.hash(pass, 5)
    } catch (e) {
        return null
    }
    const token = jwt.sign({ identifier }, process.env.JWT_KEY, {
        expiresIn: '1h',
    })

    try {
        const cart = await Cart.create({ items: [], totalPrice: 0 })
        const user = await User.create({
            email,
            password,
            name,
            identifier,
            token,
            cart,
        })
        if (!user) {
            return null
        }
        return user
    } catch (e) {
        return null
    }
}
const updateUser = async (user, { cart, addresses, email, name }) => {
    //! Add items to cart if there is any
    if (cart && Array.isArray(cart)) {
        console.log('Im here')
        await user.clearCart()
        for (const item of cart) {
            let product = null
            try {
                product = await Product.findById(item)
                console.log(product.name)
            } catch (e) {
                return {
                    isValid: false,
                    message:
                        'Error trying to find that product in the database.',
                }
            }
            await user.addToCart(product)
        }
    }

    if (addresses && Array.isArray(addresses)) {
        for (const address of addresses) {
            if (address.roadName && address.postalCode && address.locality) {
                return {
                    isValid: false,
                    message:
                        'Was not possible to create address with the provided data',
                }
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
        return await user.save()
    } catch (e) {
        return null
    }
}
const getUserInformation = (user) => {
    return User.findOne({ identifier: user.identifier })
        .select('name email admin token cart -_id')
        .populate({
            path: 'cart',
            select: '-__v',
            populate: { path: 'items.item', select: '-__v' },
        })
        .exec()
}
module.exports = {
    profile: async (req, res) => {
        // try {
        const user = await getUserInformation(req.user)

        if (!user) {
            throw new Error()
        }
        return res.status(200).json({ user })
    },
    update: async (req, res) => {
        const result = await updateUser(req.user, req.body)
        if (!result.isValid) {
            return res.status(422).json({
                errorMessage: result.errorMessage,
            })
        }
        return res
            .status(200)
            .json({ user: await getUserInformation(req.user) })
    },
    register: async (req, res) => {
        const { name, email, password1, password2 } = req.body

        //* Geral validations
        let errorMessage
        if (!email || !password1 || password1 !== password2 || !name) {
            errorMessage = 'Invalid Inputs.'
        }
        if (await getUserByEmail(email)) {
            errorMessage = 'User is already register.'
        }
        if (errorMessage) {
            return res.status(400).json({ errorMessage })
        }
        //* User creation

        const user = await createUser(name, email, password1)
        if (!user) {
            errorMessage =
                "We couldn't process the registration right now. Please try again later."
        }
        if (errorMessage) {
            return res.status(422).json({ errorMessage })
        }

        return res.status(201).json({ token: user.token })
    },
    login: async (req, res) => {
        const { email, password } = req.body
        //* Geral validations
        let errorMessage
        if (!email || !password) {
            errorMessage = 'Invalid Inputs'
        }
        const user = await getUserByEmail(email)
        if (!user) {
            errorMessage = 'User does not exist.'
        }
        if (errorMessage) {
            return res.status(400).json({ errorMessage })
        }

        let isPasswordValid
        try {
            isPasswordValid = await bc.compare(password, user.password)
        } catch (e) {
            return res
                .status(422)
                .json({ errorMessage: 'The given password is invalid.' })
        }

        if (!isPasswordValid) {
            return res
                .status(422)
                .json({ errorMessage: 'The given password is invalid.' })
        }

        const token = jwt.sign(
            { identifier: user.identifier },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        )
        user.token = token

        try {
            user.save()
            return res.status(200).json({ token })
        } catch (e) {
            return res.status(422).json({
                errorMessage:
                    "We couldn't process the login right now. Please try again later.",
            })
        }
    },
}
