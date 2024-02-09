const mongoose = require('mongoose');
//const User = require('./User');


const productSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
      },

})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;