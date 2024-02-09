const mongoose = require('mongoose');
//const Product = require('./Product');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
    required: true
    },
    email: {
        type: String,
    required: true
    },
    password: {
        type: String,
    required: true
    }
  });

  const User = mongoose.model('User', userSchema);

  module.exports = User
