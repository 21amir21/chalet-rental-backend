const mongoose = require("mongoose");

module.exports.initDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    throw err;
  }
};
