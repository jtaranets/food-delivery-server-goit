const productsWithIDMatch = /products\/\d{8}/gm;
const productRouter = require("./productRouter");
const productIDRouter = require("./productIDRouter");
const productIDsRouter = require("./productIDsRouter");
const productCategoryRouter = require('./productCategoryRouter');

const productHandler = (request, response) => {
  if(request.method === 'GET'){
  const ourUrl = request.parsedUrl.pathname;
  if (ourUrl === "/products") {
     productRouter(request, response);
     return
  } else if (productsWithIDMatch.test(ourUrl)) {
    console.log('product with ID');
    return productIDRouter(request, response);
  }
  else if(request.parsedUrl.query.includes('ids')){
    return productIDsRouter(request, response);
  }
  else if(request.parsedUrl.query.includes('category')){
    return productCategoryRouter(request, response)
  }
}};

module.exports = productHandler;
