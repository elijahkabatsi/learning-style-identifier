const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config(); // load .env variables

const questions = require("./data/questions");

const app = express();
app.use(cors());
app.use(express.json());

// Load API key from environment
const apiKey = process.env.API_KEY;

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server running" });
});

// Get questions
app.get("/api/questions", (req, res) => {
  res.json({ success: true, questions });
});

// Submit answers
app.post("/api/submit", (req, res) => {
  const answers = req.body.answers;
  if (!answers || answers.length === 0) {
    return res.status(400).json({ success: false, message: "No answers provided" });
  }

  let counts = { visual: 0, auditory: 0, kinesthetic: 0 };
  answers.forEach(type => counts[type]++);
  let learningStyle = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

  res.json({ success: true, result: learningStyle, counts });
});

// Fetch tip from API using API key
app.get("/api/tips", async (req, res) => {
  try {
    const response = await fetch(`https://api.adviceslip.com/advice?api_key=${apiKey}`);
    const data = await response.json();
    res.json({ tip: data.slip.advice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tip" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const PORT = process.env.PORT || process.argv[2] || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});