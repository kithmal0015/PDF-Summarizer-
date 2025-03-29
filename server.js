const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Multer Setup (File Upload)
const upload = multer({ dest: "uploads/" });

// API Root Route
app.get("/", (req, res) => {
  res.send("📄 PDF Summarizer API is Running!");
});

// PDF Upload API
app.post("/upload", upload.single("pdf"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const pdfBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(pdfBuffer);
    const text = data.text;

    // Simple Summarization (First 500 characters)
    const summary = text.substring(0, 500) + "...";

    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: "Error processing PDF" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
