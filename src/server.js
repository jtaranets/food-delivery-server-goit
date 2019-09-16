const router = require("./routes/router");
const express = require("express");
// const bodyParser = require("body-parser");
const app = require("./modules/app");

const startServer = port => {
  // app.use(bodyParser.json());
  // app.use(express.urlencoded());
  app.use("/", router);
  app.listen(port, () => {
    console.log(`server is listening on ${port} port`);
  });
};

module.exports = startServer;
