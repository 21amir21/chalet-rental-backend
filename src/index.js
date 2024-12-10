const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { initDB } = require("./config/db");
const path = require("path");
const userRouter = require("./routes/user");
const chaletRouter = require("./routes/chalet");
const bookingRouter = require("./routes/booking");
const paymentRouter = require("./routes/payment");

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

const corsOptions = {
  origin: "http://localhost:5173", // Allow your frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies or credentials if required
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the `uploads` folder
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Routes
app.use("/users", userRouter);
app.use("/chalets", chaletRouter);
app.use("/bookings", bookingRouter);
app.use("/payments", paymentRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
