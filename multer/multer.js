const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    //convort your file name to a unique name which is provided by uuid package
    const uniqueId = uuidv4();
    const extension = path.extname(file.originalname); //we nee to do this step for extention for any images let's gooooo
    cb(null, uniqueId + extension);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
