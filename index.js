const startServer = require("./src/server");
const { port } = require("./config");
const connection = require("./src/modules/connect");

connection();

startServer(port);
