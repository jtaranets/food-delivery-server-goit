const mainRoute = require("./main/mainRouter");
const userRoute = require("./users/userRoute");
const userIDRoute = require("./users/userIDRoute")
const signUpRoute = require("./signup/signUpRoute");
const ordersRouter = require("./orders/ordersRouter")
const productHandler = require("./product/productHandler");
const imageRouter = require('./images/imagesRoute');
const express = require("express");
const router = express.Router();

router
  .get("", mainRoute)
  .post("/users", userRoute)
  .get("/users/:id", userIDRoute)
  .post("/orders", ordersRouter)
  .post("/signup", signUpRoute)
  .use("/products", productHandler)
  .post("/images", imageRouter);

module.exports = router;
