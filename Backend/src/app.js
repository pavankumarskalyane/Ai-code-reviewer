require("dotenv").config();
const express = require("express");
const cors = require("cors");
const aiRoutes = require("./src/routes/aiRoutes.js");

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for frontend communication

// Default Route
app.get("/", (req, res) => {
  res.send("AI Code Review API is running!");
});

// AI Review Routes
app.use("/ai", aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
