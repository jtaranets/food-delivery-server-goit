const mainRoute = (request, response) => {
  if (request.methog === "GET") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<h1>This is main page!</h1>");
    response.end();
  }
};

module.exports = mainRoute;
