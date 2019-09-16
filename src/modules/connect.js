const mongoose = require("mongoose");
const connection = () => {
  mongoose
    .connect("mongodb://localhost/27017", { useNewUrlParser: true })
    .then(() => console.log("connected"))
    .catch(err => console.log("here is an err", err));
};


module.exports = connection;
