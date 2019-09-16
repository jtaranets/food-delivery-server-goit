const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  id: Number,
  sku: Number,
  name: String,
  description: String,
  price: String,
  currency: String,
  creatorId: Number,
  created: String,
  modified: String,
  categories: Array,
  likes: Number
});

const products = mongoose.model("Product", productSchema);





module.exports = products;
