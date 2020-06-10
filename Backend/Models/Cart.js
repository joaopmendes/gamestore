const db = require('mongoose')
const cartSchema = new db.Schema({
    items: [
        {
            item: { type: db.Schema.Types.ObjectId, ref: 'product' },
            quantity: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, required: true },
    owner: { type: db.Schema.Types.ObjectId, ref: 'user' },
})

cartSchema.methods.clearCart = async function () {
    //* Get Cart instance
    const me = await this.model('cart').findById(this._id)
    me.items = []
    me.totalPrice = 0
    me.save()
}
cartSchema.methods.calculateTotal = async function () {
    //* Get Cart instance
    const me = await this.model('cart').findById(this._id)
    let total = 0
    for (const item of me.items) {
        const product = await this.model('product').findById(item.item)
        const price = product.price
        total += price * item.quantity
    }
    me.totalPrice = total
    me.save()
}
cartSchema.methods.addProduct = async function (product) {
    console.log('[CART > addProduct] Add Product' + product.name)

    //* Get Cart instance
    const me = await this.model('cart').findById(this._id)
    let found = false
    for (const item of me.items) {
        if (item.item._id.equals(product._id)) {
            item.quantity += 1
            found = true
        }
    }
    if (!found) {
        me.items.push({ item: product, quantity: 1 })
    }
    await me.save()
    console.log('[CART > addProduct] Current Products' + me.items)
    console.log('[CART > addProduct] Current Total Price' + me.totalPrice)
    await me.calculateTotal()
}
cartSchema.methods.removeProduct = async function (product) {
    //* Get Cart instance
    const me = await this.model('cart').findById(this._id)
    console.log('product', product)
    console.log('[CART > removeProduct] Remove Product' + product.name)
    console.log('[CART > removeProduct] Initial Products' + me.items)
    let filterRemove = false
    for (const item of me.items) {
        if (item.item._id.equals(product._id)) {
            item.quantity -= 1
            if (item.quantity === 0) filterRemove = false
        }
    }
    if (!filterRemove) {
        me.items = me.items.filter((item) => !item.item._id.equals(product._id))
    }
    await me.save()
    console.log('[CART > removeProduct] Current Products' + me.items)
    console.log('[CART > removeProduct] Current Total Price' + me.totalPrice)
    await me.calculateTotal()
}

module.exports = db.model('cart', cartSchema)
