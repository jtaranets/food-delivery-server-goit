const fs = require("fs");
const url = require("url");
const readFile = fs.promises.readFile;

const urlPath = urlFromReq => {
  const pattern = /\d{8}/gm;
  const result = urlFromReq.search.match(pattern);
  return result;
};

const lookForIDs = input => {
  const file = readFile("./src/db/products/all-products.json", (err, data) => {
    if (err) {
      console.log(err);
    }
  });
  const arrWithIds = file.then(data => {
    const string = data.toString("utf8");
    const resArr = JSON.parse(string);
    const result = input.map(el => {
      const getIds = resArr.find(elem => {
        return elem.id === parseInt(el);
      });
      return getIds;
    });
    return result;
  });
  return arrWithIds;
};

const productIDsRouter = (request, response) => {
  const parsedUrl = urlPath(request.parsedUrl);
  const result = lookForIDs(parsedUrl).then(data => {
    const res = JSON.stringify(data);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(res);
    response.end();
  });
};

module.exports = productIDsRouter;
