const productsLocal = require("../../db/products/all-products.json");
const Product = require("../../modules/schema/productSchema");


const addProducts = ((req, res) => {
    productsLocal.forEach(element => {
        const productsToDb = new Product(element);
    productsToDb
      .save()
      .then(data => {
        console.log("saved");
        res.end('done')
      })
      .catch(err => console.log(err));
    });
    
     
})


  module.exports = addProducts