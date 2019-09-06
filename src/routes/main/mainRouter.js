const mainRoute = (request, response) => {
  if (request.method === "GET") {
    response
      .set("Content-Type", "text/html")
      .send("<h1>This is main page!</h1>");
    // response.writeHead(200, { "Content-Type": "text/html" });
    // response.write("<h1>This is main page!</h1>");
    response.end();
  }
};

module.exports = mainRoute;
