const db = require('mongoose')
const productSchema = new db.Schema({
    name: { type: String, required: true },
    category: [
        { type: db.Schema.Types.ObjectId, rel: 'category', default: [] },
    ],
    price: { type: Number, required: true },
})

module.exports = db.model('product', productSchema)
