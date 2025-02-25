const { generateContent } = require("../services/ai.services");

module.exports.getReview = async (req, res) => {
  try {
    const code = req.body.code;
    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const response = await generateContent(code);
    res.json({ response }); // Send structured JSON response
  } catch (error) {
    console.error("Error in AI response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
