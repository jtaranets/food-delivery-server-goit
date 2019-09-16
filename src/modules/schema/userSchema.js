const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: String,
    telephone: String,
    password: String,
    email: String,
    id:String,
    favoriteProducts: Array,
    viewedProducts: Array,
    orders: Array
  });

  const users = mongoose.model('User', userSchema);

  module.exports = users