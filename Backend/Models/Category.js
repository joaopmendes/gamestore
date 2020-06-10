const db = require('mongoose')
const categorySchema = new db.Schema({
    name: { type: String, required: true },
})

module.exports = db.model('category', categorySchema)
