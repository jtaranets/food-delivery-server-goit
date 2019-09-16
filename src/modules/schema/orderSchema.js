const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    creator: String,
    productsList: [{product: String, type:{type: String, enum: ["M", "XL", "XXL"]}, itemsCount: Number}],
    deliveryType: {type: String, enum: ["delivery", "office"]},
    deliveryAdress: String,
    sumToPay: Number,
    status: {type: String, enum: ["inProgress", "declined", "finished", "failed"]}
})

const orders = mongoose.model("Order", orderSchema);

module.exports = orders