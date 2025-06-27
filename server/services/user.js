// File: server/services/user.js

const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    if (username.length < 5) {
      return res.status(400).json({ error: "Username must be at least 5 characters." });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters." });
    }

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return res.status(400).json({ error: "Username or email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    return res.status(200).json({ success: "Registration successful." });
  } catch (error) {
    console.error("🔥 Register Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: "All fields required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User does not exist" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.cookie("taskifyUserToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Lax",
    });

    return res.status(200).json({ success: "Login successful" });
  } catch (error) {
    console.error("🔥 Login Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Logout
const logout = (req, res) => {
  try {
    res.clearCookie("taskifyUserToken", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("🔥 Logout Error:", error.message);
    return res.status(500).json({ error: "Logout failed" });
  }
};

// Get user details + tasks
const userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("tasks").select("-password");

    const tasks = user.tasks || [];

    const categorized = {
      yetToStart: tasks.filter(t => t.status === "yetToStart"),
      inProgress: tasks.filter(t => t.status === "inProgress"),
      completed:  tasks.filter(t => t.status === "completed"),
    };

    return res.status(200).json({
      success: "User details fetched",
      user: { email: user.email }, // ✅ Added this line to expose email
      tasks: categorized,
    });
  } catch (error) {
    console.error("🔥 UserDetails Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { register, login, logout, userDetails };
