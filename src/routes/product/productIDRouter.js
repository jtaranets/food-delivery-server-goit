const fs = require("fs");

const getId = reqUrl => {
  const lastIndex = reqUrl.lastIndexOf("/");

  if (lastIndex !== -1) {
    return reqUrl.slice(lastIndex + 1);
  }
};

const urlPath = urlFromReq => {
  const urlID = getId(urlFromReq.pathname);
  const urlIDtoNum = parseInt(urlID);
  return urlIDtoNum;
};

const productIDRouter = (request, response) => {
  fs.readFile("./src/db/products/all-products.json", (err, data) => {
    if (err) {
      console.log(err);
    }
    const id = parseInt(request.params.name)
    const array = JSON.parse(data);
    const result = array.find(el => el.id === id);
    if (result) {
      response.writeHead(200, { "Content-Type": "application/json" });
      const resString = JSON.stringify(result);
      response.end(`{
              "status": "success", 
              "products": ${resString}
             }`);
    } else {
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end("<h1>There is no such item</h1>");
    }
  });
};

module.exports = productIDRouter;




