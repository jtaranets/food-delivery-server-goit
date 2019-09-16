const fs = require("fs");
const fsPromise = fs.promises;
const path = require("path");
const uuid = require("uuid/v4");

const userRoute = (request, response) => {
  if (request.method === "POST") {
    let body = "";
    request.on("data", function(data) {
      body = body + data;
    });

    request.on("end", function() {
      const client = JSON.parse(body);
      client.id = uuid();
      saveUser(client).then(data => {
        if (client.checkResult) {
          response.send(`Can't add user, ${client.checkResult}`);
        } else {
          response.setHeader("Content-Type", "application/json");
          response.json({
            status: "success",
            user: client
          });
        }
        response.end();
      });
    });
  }
};

saveUser = function(user) {
  const pathToSave = `${__dirname}../../../db/users/all-users.json`;
  const allUsers = fsPromise
    .readFile(pathToSave, (err, data) => {
      if (err) throw err;
    })
    .then(data => {
      const string = data.toString();
      if (string.length !== 0) {
        return JSON.parse(string);
      } else {
        return [];
      }
    })
    .then(res => {
      if (res.length === 0) {
        res.push(user);
      } else {
        const check = res.some(el => el.username === user.username);
        if (check) {
          user.checkResult = "SUCH USER ALREADY EXISTS";
          return;
        } else {
          res.push(user);
        }
      }
      const result = JSON.stringify(res);
      fs.writeFile(pathToSave, result, (err, data) => {
        if (err) throw err;
      });
    });
  return allUsers;
};
module.exports = userRoute;
