const fs = require("fs");
const fsPromise = fs.promises;
const User = require("../../modules/schema/userSchema");

const userRoute = (request, response) => {
  let body = "";
  request.on("data", function(data) {
    body = body + data;
  });

  request.on("end", function() {
    const client = JSON.parse(body);
    // client.id = uuid();
    saveUser(client, request, response);
  });
};

saveUser = function(user, request, response) {
  const match = User.findOne({ email: user.email }, (err, person) => {
    if (err) throw err;
  });

  match.then(person => {
    if (person) {
      console.log("it matched");
      response.setHeader("Content-Type", "application/json");
      response.send("such user already exists");
      response.end();
    } else {
      const usertoDB = new User(user);
      usertoDB.save().then(() => {
        response.setHeader("Content-Type", "application/json");
        response.json({
          status: "success",
          user
        });
        console.log("New user created");
        response.end();
      });
    }
  });
  return match;
};
module.exports = userRoute;
