require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const User = require("./models/user"); // Import User model

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

app.use(cors());
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Root route to fetch all users
app.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude passwords
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Import and use the auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Serve static files from React build
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
