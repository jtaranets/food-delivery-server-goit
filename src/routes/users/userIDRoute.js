const fs = require("fs");
const path = require("path");

const userID = (req, res) => {
  const id = req.params.id;
  const pathToFile = `${__dirname}../../../db/users/all-users.json`;

  fs.readFile(pathToFile, (err, data) => {
    if (err) throw err;
    const string = data.toString();
    const array = JSON.parse(string);
    const result = array.find(el => el.id === id);
    if (!result) {
      res.json({ status: "not found" });
      res.end()
    } else {
      res.json(result);
      res.end();
    }
  });
};

module.exports = userID;
