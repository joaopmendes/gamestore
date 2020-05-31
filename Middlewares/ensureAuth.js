const jwt = require('jsonwebtoken')
const models = require('../Models')
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split('Bearer ')[1]
        const tokenDecoded = jwt.verify(token, process.env.JWT_KEY)
        req.user = await models.User.findOne({
            identifier: tokenDecoded.identifier,
        })
        return next()
    } catch (e) {
        const error = new Error('Token not verified.')
        error.status = 403
        next(error)
    }
}
