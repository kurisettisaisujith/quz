import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchQuizData } from '../utils/api';
import Confetti from 'react-confetti';
import "../styles.css";
import clickSound from "../images/click.mp3"; // Sound for option selection
import correctSound from "../images/correct2.mp4"; // Sound for correct answer
import incorrectSound from "../images/wrong.mp3"; // Sound for incorrect answer
import streakSound from "../images/strike2.mp3"; // Sound for achieving a streak 
import nextSound from "../images/click.mp3";// Sound for achieving a streak

const Quiz = () => {
  const [quizData, setQuizData] = useState({ questions: [] });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [totalTimeLeft, setTotalTimeLeft] = useState(120); // 2 minutes timer
  const [streak, setStreak] = useState(0);
  const [boostUnlocked, setBoostUnlocked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const navigate = useNavigate();
  const { name } = useLocation().state;
  

  useEffect(() => {
    const loadQuizData = async () => {
      const data = await fetchQuizData();
      if (data && data.questions) {
        setQuizData(data);
      } else {
        console.error('No questions found in the API response');
      }
    };
    loadQuizData();
  }, []);

  useEffect(() => {
    if (totalTimeLeft > 0) {
      const timer = setTimeout(() => setTotalTimeLeft(totalTimeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate('/results', { state: { score, total: quizData.questions.length, name } });
    }
  }, [totalTimeLeft, navigate, score, quizData.questions.length, name]);

  const handleAnswerClick = (answer) => {
    new Audio(clickSound).play(); // Play sound effect on answer selection
    setSelectedAnswer(answer);
    const correctAnswer = quizData.questions[currentQuestion].options.find(
      (option) => option.is_correct
    )?.description;

    if (answer === correctAnswer) {
      setScore(score + 10); // Add 10 points for correct answer
      setStreak(streak + 1); // Increase streak
      new Audio(correctSound).play(); // Play correct answer sound
      setShowConfetti(true); // Show confetti for achieving a streak
      setTimeout(() => setShowConfetti(false), 3000);



      if (streak + 1 >= 3) {
         // Play streak sound
         new Audio(streakSound).play(); 
 // Hide confetti after 3 seconds
      }

      if (streak + 1 >= 5 && !boostUnlocked) {
        setBoostUnlocked(true); // Unlock boost after 5 correct answers in a streak
      }
    } else {
      setStreak(0); // Reset streak on incorrect answer
      new Audio(incorrectSound).play(); // Play incorrect answer sound
    }
  };

  const handleNextQuestion = () => {
    new Audio(nextSound).play(); // Play sound effect when going to next question
    if (currentQuestion < quizData.questions.length - 1) {
      setSelectedAnswer(null);
      setCurrentQuestion(currentQuestion + 1);
    } else {
     

      navigate('/results', { state: { score, total: (quizData.questions.length)*10, name } });
    }
  };

  if (quizData.questions.length === 0) {
    return <div>Loading...</div>;
  }

  const { description, options } = quizData.questions[currentQuestion];

  return (
    <div className="quiz">
      {showConfetti && <Confetti />}
      <div className="quiz-container">
        <h2>Question {currentQuestion + 1} of {quizData.questions.length}</h2>
        <p className={`timer ${totalTimeLeft <= 10 ? 'warning' : ''}`}>⏳ Time Left: {totalTimeLeft} seconds</p>
        <p className="score">⭐ Score: {score}</p>
        { <p className="streak">🔥 Streak: {streak}!</p>}
        <p>{description}</p>
        <div className="answers">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option.description)}
              className={`answer-btn ${selectedAnswer === option.description ? 'selected' : ''}`}
              disabled={selectedAnswer !== null} // Disable buttons after selection
            >
              {option.description}
            </button>
          ))}
        </div>

        <button className="next-button" onClick={handleNextQuestion} disabled={!selectedAnswer}>
          {currentQuestion < quizData.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </button>

        {boostUnlocked && <div className="boost-effect">Boost Unlocked!</div>}
      </div>
    </div>
  );
};

export default Quiz;