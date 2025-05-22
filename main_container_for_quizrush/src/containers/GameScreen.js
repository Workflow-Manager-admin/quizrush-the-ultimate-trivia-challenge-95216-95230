import React, { useEffect } from 'react';
import QuizHeader from '../components/QuizHeader';
import QuizQuestion from '../components/QuizQuestion';
import { useGame } from '../context/GameContext';

/**
 * GameScreen component for the active gameplay screen
 * Shows the current question, timer, and score
 */
const GameScreen = () => {
  const { state, isGameActive } = useGame();
  const { loading, error, questions } = state;
  
  // If game is still loading questions
  if (loading) {
    return (
      <div className="game-screen loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading trivia questions...</p>
      </div>
    );
  }
  
  // If there was an error fetching questions
  if (error) {
    return (
      <div className="game-screen error-screen">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button 
          className="btn"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }
  
  // If no questions were loaded
  if (!questions || questions.length === 0) {
    return (
      <div className="game-screen error-screen">
        <h2>No questions available</h2>
        <p>Please try a different category or difficulty level.</p>
        <button 
          className="btn"
          onClick={() => window.location.reload()}
        >
          Back to Start
        </button>
      </div>
    );
  }
  
  return (
    <div className="game-screen">
      <QuizHeader />
      <div className="game-content">
        <QuizQuestion />
      </div>
    </div>
  );
};

export default GameScreen;
