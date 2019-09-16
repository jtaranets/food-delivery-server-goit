const User = require("../../modules/schema/userSchema");
const updateUser = (req, res) => {
  let body = "";
  req.on("data", data => {
    body += data;
  });
  req.on("end", () => {
    const result = JSON.parse(body);
    const resultKeys = Object.keys(result);
    User.findById(req.params.id, (err, data) => {
      if (err) {
        res.send("There is no such user");
        throw err;
      }
      resultKeys.forEach(key => {
        data[key] = result[key];
      });
      data.save();
      res.json({ status: "success", user: data });
      res.end()
    });
  });
};

module.exports = updateUser;
