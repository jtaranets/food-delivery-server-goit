const fs = require("fs");

const productIDsRouter = (request, response) => {
    response.writeHead(200, {"Content-Type": "application/json"});
    response.end('We are checking IDs')
}