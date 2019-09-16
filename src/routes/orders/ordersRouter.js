const Order = require("../../modules/schema/orderSchema");

const addOrders = ((req, res) => {
    let body = "";
    req.on("data", data =>{
        body += data;
    })
    req.on("end", () => {
    const resultToArr = JSON.parse(body);
const order = new Order(resultToArr).save().then(() => console.log("order is saved"))
        res.end("success, order is added")
    })
})

module.exports = addOrders