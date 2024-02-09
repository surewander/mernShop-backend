const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,  
    },
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem',
        required: false
    }],
    count: Number
})



const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;