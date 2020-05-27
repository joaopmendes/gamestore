const jwt = require('jsonwebtoken')
const models = require('../Models')
module.exports = async (req, res, next) => {
    let token
    try {
        token = req.headers.authorization.split('Bearer ')[1]
    } catch (err) {
        return res.status(403).json({ errorMessage: 'Token not found.' })
    }
    if (!token) {
        return res.status(403).json({ errorMessage: 'Token not found.' })
    }
    let tokenDecoded
    try {
        tokenDecoded = jwt.verify(token, process.env.JWT_KEY)
    } catch (err) {
        return res.status(403).json({ errorMessage: 'Could not decode token.' })
    }

    if (!tokenDecoded.identifier) {
        return res.status(403).json({ errorMessage: 'Token badly formated.' })
    }
    let user
    try {
        user = await models.User.findOne({ identifier: tokenDecoded.identifier })
    } catch (err) {
        return res.status(403).json({ errorMessage: 'User not found.' })
    }

    if (user) {
        req.user = user
        return next()
    }

    return res.status(403).json({ errorMessage: 'User not found.' })
}
