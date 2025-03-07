const express = require("express");
const aiController = require("../controllers/ai.controllers");

const router = express.Router();

// Route for AI code review
router.post("/review", aiController.getReview); // Changed "/get-review" to "/review"

module.exports = router;
