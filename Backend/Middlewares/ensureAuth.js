const jwt = require('jsonwebtoken')
const { createError } = require('../helpers/helpers')
const {
    getUserInformationByIdentification,
} = require('../Services/UserService/helpers')
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split('Bearer ')[1]
        const tokenDecoded = jwt.verify(token, process.env.JWT_KEY)
        req.user = await getUserInformationByIdentification(
            tokenDecoded.identifier
        )
        if (!req.user) {
            next(createError(403, 'Token not verified.'))
        }

        return next()
    } catch (e) {
        console.log('-> e', e)
        next(createError(403, 'Token not verified.'))
    }
}
