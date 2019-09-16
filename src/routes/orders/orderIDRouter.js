const Order = require("../../modules/schema/orderSchema");
const orderID = (req, res) => {
  const result = Order.findById(req.params.id, (err, data) => {
    if (err) {
        res.status(400)
        res.end("couldn't find such order")
      throw err;
    }
    res.json({
      status: "success",
      order: data
    });
    res.end();
  });
};

module.exports = orderID;
