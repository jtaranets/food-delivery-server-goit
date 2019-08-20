const qs = require("querystring");
const fs = require("fs");
const path = require("path");

const signUpRoute = (request, response) => {
  if (request.method === "POST") {
    let body = "";

    request.on("data", function(data) {
      body = body + data;

      console.log("Incoming data!!!!");
    });

    request.on("end", function() {
      console.log(body);
      const post = JSON.parse(body);
      console.log(post);
      response.end(`{
        "status": "success", 
        "user":${body}}`);
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
