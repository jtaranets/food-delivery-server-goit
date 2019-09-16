const fs = require("fs");
const path = require("path");
const uuid = require("uuid/v4");
const pathToProducts = `${__dirname}../../../db/products/all-products.json`;
const pathToUsers = `${__dirname}../../../db/users/all-users.json`;

const fetchData = function(path) {
  return new Promise((res, rej) => {
    fs.readFile(path, (err, data) => {
      if (err) rej(err);
      const string = data.toString();
      const array = JSON.parse(string);
      res(array);
    });
  });
};

const findProducts = (items, allItems) => {
  const result = items.map(el => {
    const element = allItems.find(elem => {
      return elem.id === el;
    });
    return element;
  });
  return result;
};

const findUser = (userID, allUsers) => {
  const result = allUsers.find(el => el.id === userID);
  return result;
};

const writeFile = (userName, orderID, obj) => {
  fs.writeFile(
    path.join(
      __dirname,
      "../../db/users/",
      userName,
      "orders/",
      `${orderID}.json`
    ),
    JSON.stringify(obj),
    err => {
      console.log("Order is created and saved");
      if (err) throw err;
    }
  );
};

const orders = (req, res) => {
  let body = "";
  req.on("data", data => {
    body += data;
  });
  req.on("end", () => {
    const obj = JSON.parse(body);
    obj.id = uuid();
    const products = obj.products;
    const user = obj.user;
    const allProductsAssync = fetchData(pathToProducts);
    const allUsersAssync = fetchData(pathToUsers);
    Promise.all([allProductsAssync, allUsersAssync]).then(data => {
      const allProducts = data[0];
      const allUsers = data[1];
      const productsFromOrder = findProducts(products, allProducts);
      const userFromOrder = findUser(user, allUsers);
      const userName = userFromOrder.username;
      const orderID = obj.id;
      const savingOrder = () => {
        return new Promise((res, rej) => {
          fs.mkdir(
            path.join(__dirname, "../../db/users/", userName, "orders"),
            err => {
              if (err) rej(err);
              res("Folder is created");
            }
          );
        });
      };
      savingOrder()
        .then(data => {
          console.log(data);
          writeFile(userName, orderID, obj);
        })
        .catch(err => {
          if (err.code === "EEXIST") {
            writeFile(userName, orderID, obj);
          }
        });
      res.json({ status: "success", order: obj });
      res.end();
    });
  });
};

module.exports = orders;
