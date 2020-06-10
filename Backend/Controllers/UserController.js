const jwt = require('jsonwebtoken')
const bc = require('bcrypt')
const { createError } = require('../helpers/helpers')
const {
    createUser,
    updateUser,
} = require('../Services/UserService/UserServices')
const {
    getUserByEmail,
    getUserInformation,
} = require('../Services/UserService/helpers')

module.exports = {
    profile: async (req, res, next) => {
        // try {
        try {
            const user = await getUserInformation(req.user)
            return res.status(200).json({ user })
        } catch (e) {
            return next(createError(400, 'User not found'))
        }
    },
    update: async (req, res, next) => {
        try {
            await updateUser(req.user, req.body)
            return res
                .status(200)
                .json({ user: await getUserInformation(req.user) })
        } catch (e) {
            return next(e)
        }
    },
    register: async (req, res, next) => {
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
            return next(createError(400, errorMessage))
        }
        //* User creation
        try {
            const user = await createUser(name, email, password1)
            return res.status(201).json({ user: await getUserInformation(user) })
        } catch (e) {
            return next(e)
        }
    },
    login: async (req, res, next) => {
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
            return next(createError(400, errorMessage))
        }

        let isPasswordValid
        try {
            isPasswordValid = await bc.compare(password, user.password)
        } catch (e) {
            return next(createError(422, 'Password Invalid'))
        }

        if (!isPasswordValid) {
            return next(createError(422, 'Password Invalid'))
        }

        const token = jwt.sign(
            { identifier: user.identifier },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        )
        user.token = token

        try {
            await user.save()
            return res.status(200).json({ user: await getUserInformation(user) })
        } catch (e) {
            return next(
                createError(
                    422,
                    "We couldn't process the login right now. Please try again later."
                )
            )
        }
    },
}
