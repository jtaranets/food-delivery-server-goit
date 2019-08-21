const url = require("url");
const fs = require("fs");

const match = /products\/\d{8}/gm;
const productRouter = require('./productRouter');
const productIDRouter = require('./productIDRouter');

const getId = reqUrl => {
    const lastIndex = reqUrl.lastIndexOf('/');
    if (lastIndex !== -1) {
      return reqUrl.slice(lastIndex +1);
    }
  };

  const urlPath = url => {
    const parsedUrl = url.parse(url);
    const urlID = getId(parsedUrl.pathname);
 const urlIDtoNum = parseInt(urlID);       
 return urlIDtoNum;
  }


const productHandler = (request, response) => {
    const ourUrl = url.parse(request.url).pathname;
console.log(ourUrl);
    if(ourUrl === "/products"){
        console.log('in products');
        return productRouter;
    }
    else if(match.test(ourUrl)){
        
            response.writeHead(200, {"Content-Type": "application/json"});
        
            fs.readFile('./src/db/products/all-products.json', (err, data) => {
                if(err){
                  console.log(err);
                }
                const resultUrl = urlPath(request.url);       
                const array = JSON.parse(data);
                const result = array.find(el => el.id === resultUrl);
                // console.log(result);
                const resString = JSON.stringify(result);
                response.end(resString);
          
          });
    }
}

module.exports = productHandler