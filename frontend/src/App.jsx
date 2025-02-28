import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');

  const handleReview = async () => {
    try {
      const response = await fetch("https://ai-code-reviewer-backend-tgbk.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch review");
      }

      const data = await response.json();
      setReview(data.response);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setReview("⚠️ Unable to fetch AI review.");
    }
  };

  return (
    <main>
      {/* Left: Code Input */}
      <div className="left">
        <textarea
          className="code-editor"
          placeholder="Write your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className="preview-btn" onClick={handleReview}>
          Get Review
        </button>
      </div>

      {/* Right: AI Review */}
      <div className="right">
        <div className="review">
          <ReactMarkdown>{review}</ReactMarkdown>
        </div>
      </div>
    </main>
  );
}

export default App;
