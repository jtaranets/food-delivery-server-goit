const Product = require("../../modules/schema/productSchema");

const updateProduct = (req, res) => {
  let body = "";
  req.on("data", data => {
    body += data;
  });
  req.on("end", () => {
    const result = JSON.parse(body);
    const arrOfKeys = Object.keys(result);
    Product.findById(req.params.id, (err, data) => {
        if(err) throw err
        arrOfKeys.forEach(key => {
        data[key] = result[key];
        });
        data.save();
        res.json({ status: "success", product: data })
    })
  });
};

module.exports = updateProduct;
