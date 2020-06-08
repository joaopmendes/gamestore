const db = require('mongoose')
const orderSchema = new db.Schema({
    user: { type: db.Schema.Types.ObjectId, ref: 'user' },
    currentCart: { type: db.Schema.Types.ObjectId, ref: 'cart' },
    status: { type: String, required: true },
    mailingAddress: { type: db.Schema.Types.ObjectId, ref: 'address' },
    billingAddress: { type: db.Schema.Types.ObjectId, ref: 'address' },
    nif: { type: String, required: false },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
})

module.exports = db.model('order', orderSchema)
