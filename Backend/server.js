require("dotenv").config();
const express = require("express");
const app = require("./app"); // Import app from app.js

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
