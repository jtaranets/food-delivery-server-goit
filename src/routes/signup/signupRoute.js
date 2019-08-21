const qs = require("querystring");
const fs = require("fs");
const path = require("path");

const signUpRoute = (request, response) => {
  if (request.method === "POST") {
    let body = "";

    request.on("data", function(data) {
      body = body + data;

    });

    request.on("end", function() {
      const post = JSON.parse(body);
      response.end(JSON.stringify({
        "status": "success", 
        "user": post }));
      saveUser(body);
    });
  }
};

saveUser = function(user) {
  const name = JSON.parse(user).username;
  const pathToSave = "src/db/users";
  fs.appendFile(path.join(pathToSave, `${name}.json`), user, function(err) {
    if (err) throw err;
    console.log("Saved!");
  });
};
module.exports = signUpRoute;
