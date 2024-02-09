const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: Number
})


const CartItem = mongoose.model('CartItem', cartItemSchema );

module.exports = CartItem;