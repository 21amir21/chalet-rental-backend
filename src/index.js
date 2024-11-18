const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { initDB } = require("./config/db");
const userRouter = require("./routes/user");

// Load environment variables
dotenv.config();

// Connect to MongoDB
initDB()
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/users", userRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
