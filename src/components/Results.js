import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';  // Confetti library
import "../styles.css";

const Results = () => {
  const { score, total, name } = useLocation().state;
  const navigate = useNavigate();
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (score / total >= 0.1) {
      setShowCelebration(true);
    
      setTimeout(() => setShowCelebration(false), 5000);
    }
  }, [score, total]);

  const retakeQuiz = () => {
    navigate('/');
  };

  const getMessage = () => {
    const percentage = (score / total) * 100;
    if (percentage === 100) return "🎉 Perfect Score! You're a Genius! 🏆";
    if (percentage >= 80) return "🔥 Amazing Job! You're a Pro!";
    if (percentage >= 50) return "👍 Good Effort! Keep Improving!";
    return "💡 Keep Practicing! You'll Get There!";
  };

  return (
    <div className="results">
      {showCelebration && <Confetti />} {/* Confetti animation */}
      <div className="glass-card">
        <h1>🏆 Quiz Results 🏆</h1>
        <p>{name}, you scored <strong>{score} out of {total}</strong>!</p>
        <div className="summary">
          <p>✅ Correct Answers: {score/10}</p>
          <p>❌ Incorrect Answers: {total/10 - score/10}</p>
        </div>
        <p className="result-message">{getMessage()}</p>
        <button className="retake-button" onClick={retakeQuiz}>🔄 Try Again</button>
      </div>
    </div>
  );
};

export default Results;
