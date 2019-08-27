const fs = require("fs");
const productRouter = (request, response) => {

    response.writeHead(200, {"Content-Type": "application/json"});

    fs.readFile('./src/db/products/all-products.json', (err, data) => {
        if(err){
          console.log(err);
        }
        response.end(data);
  
  })};
  
  module.exports = productRouter;