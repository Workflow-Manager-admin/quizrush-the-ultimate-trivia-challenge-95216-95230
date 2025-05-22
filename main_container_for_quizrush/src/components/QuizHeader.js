import React from 'react';
import ScoreCard from './ScoreCard';
import { useGame } from '../context/GameContext';

/**
 * QuizHeader component that displays the game header with logo, progress, and score
 */
const QuizHeader = () => {
  const { state } = useGame();
  const { currentQuestionIndex, questions } = state;
  
  const progress = questions.length > 0 
    ? Math.round(((currentQuestionIndex + 1) / questions.length) * 100) 
    : 0;

  return (
    <header className="quiz-header">
      <div className="logo">
        <span className="logo-symbol">⚡</span> 
        <span className="logo-text">QuizRush</span>
      </div>
      
      <div className="progress-container">
        <div className="progress-text">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <ScoreCard />
    </header>
  );
};

export default QuizHeader;
