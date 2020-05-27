const db = require('mongoose')
const addressSchema = new db.Schema({
    roadName: { type: String, required: true },
    postalCode: { type: String, required: true },
    locality: { type: String, required: true },
})

module.exports = db.model('address', addressSchema)
