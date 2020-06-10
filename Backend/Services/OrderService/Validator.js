const { createError } = require('../../helpers/helpers')
const validateAddress = async (
    user,
    address,
    errMessage = 'Address not found for the user'
) => {
    if (!address) {
        throw createError(400, 'Address Invalid')
    }
    const userAddresses = user.addresses
    if (userAddresses.length === 0) {
        throw createError(400, errMessage)
    }
    const foundAddress = userAddresses.find((userAddress) =>
        userAddress.equals(address)
    )
    if (!foundAddress) {
        throw createError(400, errMessage)
    }
}
const validateIfCartHasItems = (user) => Boolean(user.cart.items.length)
const validateNIf = (nif) => {
    let value = nif
    let valid = false
    let check
    let format = /^[0-9]*$/
    if (format.test(value)) {
        //NIF Validation
        if (value.length === 9) {
            let sum =
                parseInt(value[7]) * 2 +
                parseInt(value[6]) * 3 +
                parseInt(value[5]) * 4 +
                parseInt(value[4]) * 5 +
                parseInt(value[3]) * 6 +
                parseInt(value[2]) * 7 +
                parseInt(value[1]) * 8 +
                parseInt(value[0]) * 9
            var mod = sum % 11
            if (mod === 0 || mod === 1) {
                check = 0
            } else {
                check = 11 - mod
            }
            valid = parseInt(value[8]) === check
        } else {
            valid = false
        }

        if (!valid) {
            throw createError(400, 'Nif is invalid.')
        }
    }
}
module.exports = {
    CreateOrderInput: async (user, { mailingAddress, billingAddress, nif }) => {
        //* Validate addresses
        await validateAddress(
            user,
            mailingAddress,
            'Mailing address not found in the user addresses.'
        )
        await validateAddress(
            user,
            billingAddress,
            'Billing address not found in the user addresses.'
        )

        //* Validate nif
        validateNIf(nif)
        console.log('-> user', user)

        if (!validateIfCartHasItems(user)) {
            throw createError(400, 'Empty cart')
        }
    },
}
