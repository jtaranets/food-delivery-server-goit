const mainRoute = require('./main/mainRouter');
const signupRoute = require('./signup/signupRoute');
const productHandler = require('./product/productHandler');
const match = /\/products(\/\d{8})?(\/\?ids=(\d{8},?\s?)+)?/gm;

const router = (url) => {
  if(url === "/"){
    return mainRoute;
  }
  else if (url === "/signup") {
    return signupRoute;
  }
  else if(match.test(url) ){
return productHandler;
  }
  else{
return mainRoute
  }
}



module.exports = router;