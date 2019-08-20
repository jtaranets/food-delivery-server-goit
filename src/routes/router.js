const mainRoute = require('./main/mainRouter');
const productRouter = require('./product/productRouter');
const aboutRouter = require('./about/aboutRouter');
const signupRoute = require('./signup/signupRoute')


const router = {
  "/": mainRoute,
  "/products": productRouter,
  "/about": aboutRouter,
  "/signup": signupRoute,
  default: mainRoute
};

module.exports = router;