const express = require("express");
const cors = require("cors");
require("dotenv").config();

const questions = require("./data/questions");

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server running" });
});

// Get questions
app.get("/api/questions", (req, res) => {
  res.json({ success: true, questions });
});

// Submit answers and return learning style
app.post("/api/submit", (req, res) => {
  const answers = req.body.answers;

  if (!answers || answers.length === 0) {
    return res.status(400).json({ success: false, message: "No answers provided" });
  }

  let counts = {
    visual: 0,
    auditory: 0,
    kinesthetic: 0
  };

  answers.forEach(type => {
    counts[type]++;
  });

  let learningStyle = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  res.json({
    success: true,
    result: learningStyle,
    counts
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});