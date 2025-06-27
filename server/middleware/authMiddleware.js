// File: server/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.taskifyUserToken;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("🔒 Auth Middleware Error:", error.message);
    return res.status(500).json({ error: "Authentication failed" });
  }
};

module.exports = authMiddleware;
