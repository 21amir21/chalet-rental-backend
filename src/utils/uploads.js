const multer = require("multer");

const storage = multer.diskStorage({
  // this is to store the uploaded file in the `uploads` folder
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },

  // Use the original file name
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
