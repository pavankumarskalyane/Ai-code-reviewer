const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash",
  systemInstruction: `
  You are an expert code reviewer. Provide structured feedback with:
  
  - **Bad Code** (original code with a red ❌ icon).
  - **Issues List** (each issue starts with ❌ and explains the problem).
  - **Recommended Fix** (improved code with a green ✅ icon).
  - **Code Block Formatting** (use markdown triple backticks \`\`\` for syntax highlighting).
  - **Do NOT mention missing comments as an issue or suggest adding comments. Ignore the presence or absence of comments.**
  Example Response:
  
  \`\`\`md
  ❌ **Bad Code:**
  \`\`\`js
  function sum() {
      return 1 + 1;
  }
  \`\`\`
  
  ### Issues:
  - ❌ The function lacks documentation.
  - ❌ The function name "sum" suggests multiple numbers, but it only adds 1 + 1.
  - ❌ It does not accept arguments, making it inflexible.
  
  ✅ **Recommended Fix:**
  \`\`\`js
  /**
   * Adds two numbers together.
   * @param {number} a - The first number.
   * @param {number} b - The second number.
   * @returns {number} The sum of a and b.
   */
  function sum(a, b) {
      return a + b;
  }
  \`\`\`
  \`\`\`
  `
});

async function generateContent(code) {
  try {
    const result = await model.generateContent({
      contents: [{ parts: [{ text: code }] }],
    });

    if (!result || !result.response || !result.response.candidates.length) {
      throw new Error("Invalid AI response");
    }

    return result.response.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("AI Error:", error);
    return "⚠️ Error processing request.";
  }
}

module.exports = { generateContent };
