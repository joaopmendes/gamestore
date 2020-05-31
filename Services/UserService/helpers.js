const { User } = require('../../Models')

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email })
        return user || null
    } catch (err) {
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
    getUserByEmail,
    getUserInformation,
}
