const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Essential for reading Render Environment Variables

const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
// Uses MONGO_URI from Render settings, or falls back to local for your laptop
const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studentClasses";

mongoose.connect(dbURI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// Routes
app.use("/", authRoutes);

// PORT
// Render assigns a random port, so we must use process.env.PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});