const http = require("http");
const url = require("url");
const router = require("./routes/router");

const startServer = port => {
  const server = http.createServer((request, response) => {
    request.parsedUrl = url.parse(request.url);
    const func = router(request.parsedUrl.pathname);
    func(request, response);
  });

  server.listen(port);
};

module.exports = startServer;
