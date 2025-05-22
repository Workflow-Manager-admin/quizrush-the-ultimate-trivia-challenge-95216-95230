import React from 'react';
import { useGame } from '../context/GameContext';

/**
 * ScoreCard component to display the current score and streak
 */
const ScoreCard = () => {
  const { state } = useGame();
  const { score, streak } = state;
  
  // Determine if we should animate the score (on increase)
  const [prevScore, setPrevScore] = React.useState(score);
  const [isAnimating, setIsAnimating] = React.useState(false);
  
  React.useEffect(() => {
    if (score > prevScore) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    setPrevScore(score);
  }, [score, prevScore]);

  return (
    <div className="score-card">
      <div className={`score ${isAnimating ? 'score-increase' : ''}`}>
        <span>Score</span>
        <div className="score-value">{score}</div>
      </div>
      
      {streak >= 3 && (
        <div className="streak">
          <span>Streak!</span>
          <div className="streak-value">x{streak}</div>
        </div>
      )}
    </div>
  );
};

export default ScoreCard;
