// const productsWithIDMatch = /products\/\d{8}/gm;
const productsWithIDsMatch = /products\?ids=((\d)*(\D)?)*/gm;
const productRouter = require("./productRouter");
const productIDRouter = require("./productIDRouter");
const productIDsRouter = require("./productIDsRouter");
const productCategoryRouter = require("./productCategoryRouter");
const url = require("url");
const express = require("express");
const productHandler = express.Router();

const parseUrl = (req, res, next) => {
  req.parsedUrl = url.parse(req.url);
  next();
};

const foo = (req, res, next) => {
  if (req.parsedUrl.path.includes("ids")) {
    return productIDsRouter(req, res);
  } else if (req.parsedUrl.path.includes("category")) {
    return productCategoryRouter(req, res);
  }
  next();
};

productHandler
  .use(parseUrl)
  .use(foo)
  .get("", productRouter)
  .get("/:name", productIDRouter);

module.exports = productHandler;
