const fs = require('fs');

const category = url => {
const end = url.lastIndexOf('%');
const start = url.indexOf('2') + 2;
const category = url.slice(start, end);
return category
}

const productCategoryRouter = (request, response) => {
    const url = request.parsedUrl.query;
    const cat = category(url);
    fs.readFile('./src/db/products/all-products.json', (err, data) => {
        if (err){
            console.log(err);
        }
        const stringedArr = data.toString();
        const arr = JSON.parse(stringedArr);
        const result = arr.filter(elem => 
            elem.categories[0] === cat
        )
        const resultToString = JSON.stringify(result);
        if(result.length > 0){
            response.writeHead(200, {"Content-Type": "application/json"})
            response.end(`{
                "status": "success", 
                "products": ${resultToString}`)
        }
        else{
            response.writeHead(404, {"Content-Type": "application/json"})
            response.end(`{
                "status": "no products", 
                "products": ${resultToString}
               }`)
        }
    })
}

module.exports = productCategoryRouter