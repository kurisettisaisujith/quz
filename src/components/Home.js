import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // Ensure styles.css is updated
import useSound from 'use-sound';
import startSound from '../images/start.mp3';
import Sound from "../images/typing.mp3";

const Home = () => {
  const [name, setName] = useState("");
  const [funFact, setFunFact] = useState("");
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const [playStart] = useSound(startSound)

  const funFacts = [
    "Did you know? The Eiffel Tower can be 15 cm taller during hot days!",
    "Fun Fact: Octopuses have three hearts!",
    "Did you know? Honey never spoils!",
    "Fun Fact: Bananas are berries, but strawberries aren't!",
  ];

  useEffect(() => {
    // Set a random fun fact when the component mounts
    setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
  }, []);

  

  const startQuiz = () => {
    if (name.trim()) {
      playStart(); // Play sound
      setAnimate(true); // Trigger animation
      
      setTimeout(() => {
        navigate('/quiz', { state: { name } });
      }, 1000); // Delay navigation for smooth effect
    } else {
      alert('Please enter your name!');
    }
  };

  return (
    <div className="home">
      <div className={`glass-card home-card ${animate ? 'animate' : ''}`}>
        <h1 className="quiz-title">🕹️ Fun Quiz Challenge!</h1>
        <p className="quiz-subtitle typing-animation">Are you ready to test your knowledge?</p>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="name-input"
        />
        <br />
        <button className="start-button" onClick={startQuiz}>
          Start Quiz
        </button>
       
        <p className="fun-fact">💡 {funFact}</p>
      </div>
    </div>
  );
};

export default Home;