const mongoose = require("mongoose");

module.exports.initDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
};
