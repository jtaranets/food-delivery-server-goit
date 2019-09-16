const fs = require("fs");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: `${__dirname}../../../db/users/uploads/`,
  filename: function(req, file, cb) {
    cb(null, file.fieldname + path.extname(file.originalname));
  }
});
const upload = multer({ storage }).single("file");

const allUsers = new Promise((res, rej) => {
  fs.readFile(`${__dirname}../../../db/users/all-users.json`, (err, data) => {
    if (err) rej(err);
    const str = data.toString();
    res(JSON.parse(str));
  });
});

const moveUser = (filename, username) => {
  const read = fs.createReadStream(
    `${__dirname}../../../db/users/uploads/${filename}`
  );
  const write = fs.createWriteStream(
    `${__dirname}../../../db/users/${username}/${filename}`
  );
  read.pipe(write);
};

const imageRouter = (req, res) => {
  upload(req, res, err => {
    if (err) throw err;
    const userID = req.body.userID;
    allUsers.then((data, rej) => {
      const user = data.find(el => el.id === userID);
      if (user) {
        const move = moveUser(
          req.file.fieldname + path.extname(req.file.originalname),
          user.username
        );
        req.savedInFolder = user.username;
      } else {
        fs.mkdir(
          `${__dirname}../../../db/users/${req.body.userID}`,
          (err, data) => {
            if (err) {
              throw err;
            }
            const move = moveUser(
              req.file.fieldname + path.extname(req.file.originalname),
              req.body.userID
            );
          }
        );
        req.savedInFolder = "new Folder";
      }
      res.json({ status: `was saved in ${req.savedInFolder}` });
    });
  });
};

module.exports = imageRouter;
