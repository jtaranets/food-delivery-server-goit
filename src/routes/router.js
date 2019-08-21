const mainRoute = require('./main/mainRouter');
const productRouter = require('./product/productRouter');
const signupRoute = require('./signup/signupRoute');
const productIDRouter = require('./product/productIDRouter');
const productIDsRouter = require('./product/productIDsRouter');
const match = /products\/\d{8}/gm;

const router = (url) => {
  if(url === "/"){
    return mainRoute;
  }
  else if (url === "/signup") {
    return signupRoute;
  } else if(url === "/products"){
return productRouter;
  }
  else if(match.test(url) ){
    return productIDRouter;
  }
  else if("/products/?ids='<19112831>, <19112832>"){
    return productIDsRouter;
  }
}



module.exports = router;