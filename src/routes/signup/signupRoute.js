const fs = require("fs");
const path = require("path");

const signUpRoute = (request, response) => {
  console.log("signup");
  if (request.method === "POST") {
    let body = "";

    request.on("data", function(data) {
      body = body + data;
    });

    request.on("end", function() {
      console.log("end");
      const post = JSON.parse(body);
      console.log("body", body);
      saveUserToFolder(body, response)
        .then(data => {
          response.setHeader("Content-Type", "application/json");
          response.end(
            JSON.stringify({
              status: "success",
              user: post
            })
          );
        })
        .catch(err => {
          if (err) {
            console.log("here is en error", err);
            if (err.code === "EEXIST") {
              response.end("Such user already exists");
            }
          }
          throw err ("this is err", err)
        });
    });
  }
};

saveUserToFolder = function(user, response) {
  const name = JSON.parse(user).username;
  const pathToSave = "src/db/users";
  const savingUser = new Promise((res, rej) => {
    fs.mkdir(path.join(pathToSave, name), err => {
      if (err) rej(err);
      res("Folder is created");
    });
  });
  savingUser.then(data => {
    console.log(data);
    return fs.writeFile(
      path.join(pathToSave, name, `${name}.json`),
      user,
      function(err, data) {
        if (err) throw err;
        console.log("Saved!");
      }
    );
  });

  return savingUser;
};
module.exports = signUpRoute;
