import React from 'react';
import { useGame } from '../context/GameContext';

/**
 * GameOver component that displays between question completion and result screen
 */
const GameOver = ({ onContinue }) => {
  const { state } = useGame();
  const { score } = state;
  
  // Auto-continue to results after delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="game-over-overlay">
      <div className="game-over-content">
        <h2>Quiz Complete!</h2>
        <div className="final-score-preview">
          <span>Your Score:</span>
          <div className="large-score">{score}</div>
        </div>
        <p>Redirecting to results...</p>
      </div>
    </div>
  );
};

export default GameOver;
