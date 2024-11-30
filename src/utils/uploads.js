const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  // this is to store the uploaded file in the `uploads` folder
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },

  // Use the original file name
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
