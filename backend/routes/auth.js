const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, age, studentClass,  email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      age: Number(age),        // convert to number
      studentClass,
      email,
      password
    });

    await newUser.save();

    res.json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, "secretkey", {
      expiresIn: "1h"
    });

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE ATTENDANCE
router.post("/update-attendance", async (req, res) => {
  try {
    const { userId, totalClasses, attendedClasses } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.json({ message: "User not found" });
    }

    user.attendance.totalClasses = totalClasses;
    user.attendance.attendedClasses = attendedClasses;

    await user.save();

    const percentage =
      (attendedClasses / totalClasses) * 100;

    res.json({
      message: "Attendance updated",
      percentage: percentage.toFixed(2)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;