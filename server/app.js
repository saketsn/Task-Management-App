// File: server/app.js

// ✅ Import required modules
const express = require("express");                // Web framework for Node.js
const cors = require("cors");                      // Enable CORS (Cross-Origin Resource Sharing)
const cookieParser = require("cookie-parser");     // Parse cookies from incoming requests
require("dotenv").config();                        // Load environment variables

const connectDB = require("./connection/conn");    // ✅ Import DB connection function
connectDB();                                       // ✅ Call DB connection

const app = express();                             // Initialize Express app

// ✅ Import API route controllers
const userApis = require("./controllers/user");
const taskApis = require("./controllers/task");

// ✅ Allowed frontend origins (adjust based on frontend port)
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

// ✅ Middleware: CORS (for frontend-backend communication with cookies)
app.use(cors({
  origin: allowedOrigins,
  credentials: true // 🔐 Required to send HTTP-only cookies
}));

// ✅ Middleware: Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// ✅ Root API Test Route
app.get("/", (req, res) => {
  res.send("Hello from Backend. Server started 🎉");
});

// ✅ Mount API Routes
app.use("/api/v1/users", userApis);   // User routes: register, login, logout, userDetails
app.use("/api/v1/tasks", taskApis);   // Task routes: addTask, editTask, etc.

// ✅ Start the Express server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
