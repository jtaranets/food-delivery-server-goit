const fs = require("fs");

const productRouter = (request, response) => {
  console.log(request.parsedUrl);
  response.setHeader("Content-Type", "application/json");
  fs.readFile("./src/db/products/all-products.json", (err, data) => {
    if (err) {
      console.log(err);
    }
    response.send(data)
    response.end();
  });
};

module.exports = productRouter;
