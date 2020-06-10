const db = require('mongoose')
const productSchema = new db.Schema({
    name: { type: String, required: true },
    categories: [{ type: db.Schema.Types.ObjectId, ref: 'category' }],
    price: { type: Number, required: true },
    console: { type: String, required: true },
    productImage: {type: String, default: ''}
})

module.exports = db.model('product', productSchema)
