const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Health check for deployment platforms
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/cse-quiz";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    if (err.message.includes("ECONNREFUSED")) {
      console.error("👉 ACTION REQUIRED: Go to MongoDB Atlas -> Network Access -> Add IP Address -> Allow Access from Anywhere (0.0.0.0/0)");
    }
  });

const ResultSchema = new mongoose.Schema({
  name: String,
  email: String,
  totalScore: Number,
  sectionScores: Object,
  submittedAt: { type: Date, default: Date.now }
});

const Result = mongoose.model("Result", ResultSchema);

// Save result API
app.post("/api/submit", async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    res.status(201).json({ message: "Result saved" });
  } catch (err) {
    console.error("Error saving result:", err);
    res.status(500).json({ error: "Failed to save" });
  }
});

// Get all results (Teacher dashboard)
app.get("/api/results", async (req, res) => {
  try {
    const results = await Result.find().sort({ submittedAt: -1 });
    res.json(results);
  } catch (err) {
    console.error("Error fetching results:", err);
    res.status(500).json({ error: "Failed to fetch results" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
