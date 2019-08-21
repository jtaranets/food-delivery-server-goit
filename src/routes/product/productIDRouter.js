const fs = require("fs");
const url = require("url");

const getId = reqUrl => {
    const lastIndex = reqUrl.lastIndexOf('/');
  
    if (lastIndex !== -1) {
      return reqUrl.slice(lastIndex +1);
    }
  };

  const urlPath = urlFromReq => {
    const parsedUrl = url.parse(urlFromReq);
    const urlID = getId(parsedUrl.pathname);
 const urlIDtoNum = parseInt(urlID);       
 return urlIDtoNum;
  }

const productIDRouter = (request, response) => {
    response.writeHead(200, {"Content-Type": "application/json"});

    fs.readFile('./src/db/products/all-products.json', (err, data) => {
        if(err){
          console.log(err);
        }
        const resultUrl = urlPath(request.url); 
        const array = JSON.parse(data);
        const result = array.find(el => el.id === resultUrl);
        const resString = JSON.stringify(result);
        response.end(`{
            "status": "success", 
            "products": ${resString}
           }`);
  
  })};
  
  module.exports = productIDRouter;