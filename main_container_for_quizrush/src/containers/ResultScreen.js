import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { saveHighScore, getHighScores } from '../utils/helpers';

/**
 * ResultScreen component for displaying game results and final score
 */
const ResultScreen = () => {
  const { state, resetGame } = useGame();
  const { score, settings } = state;
  
  const [playerName, setPlayerName] = useState('');
  const [highScores, setHighScores] = useState([]);
  const [showScoreSubmitted, setShowScoreSubmitted] = useState(false);
  
  // Load player name and high scores on component mount
  useEffect(() => {
    const storedName = localStorage.getItem('quizrush_player_name') || '';
    setPlayerName(storedName);
    
    const scores = getHighScores();
    setHighScores(scores);
  }, []);
  
  // Calculate performance metrics
  const getPerformanceMessage = (score) => {
    if (score >= 150) return "Amazing! You're a trivia master!";
    if (score >= 100) return "Great job! You know your stuff!";
    if (score >= 50) return "Good effort! Keep practicing!";
    return "Nice try! Better luck next time!";
  };
  
  // Check if the current score is a high score (top 10)
  const isHighScore = () => {
    if (highScores.length < 10) return true;
    return score > (highScores[highScores.length - 1]?.score || 0);
  };
  
  // Handle saving the high score
  const handleSaveScore = () => {
    const name = playerName.trim() || 'Anonymous';
    const scoreData = {
      name,
      score,
      date: new Date().toISOString(),
      category: settings.category,
      difficulty: settings.difficulty
    };
    
    saveHighScore(scoreData);
    setShowScoreSubmitted(true);
    
    // Refresh high scores
    setTimeout(() => {
      setHighScores(getHighScores());
    }, 500);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="result-screen">
      <h1>Game Over!</h1>
      
      <div className="final-score">
        <div className="score-label">Final Score</div>
        <div className="score-value">{score}</div>
        <div className="performance-message">
          {getPerformanceMessage(score)}
        </div>
      </div>
      
      {isHighScore() && !showScoreSubmitted && (
        <div className="high-score-submission">
          <h3>You got a high score!</h3>
          <div className="player-name-input-group">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              maxLength={15}
              className="player-name-input"
            />
            <button 
              className="btn save-score-btn"
              onClick={handleSaveScore}
            >
              Save Score
            </button>
          </div>
        </div>
      )}
      
      {showScoreSubmitted && (
        <div className="score-submitted">
          Score submitted successfully!
        </div>
      )}
      
      <div className="high-scores">
        <h3>High Scores</h3>
        {highScores.length > 0 ? (
          <table className="high-scores-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {highScores.slice(0, 10).map((scoreItem, index) => (
                <tr key={index} className={playerName === scoreItem.name && score === scoreItem.score ? 'current-player' : ''}>
                  <td>{index + 1}</td>
                  <td>{scoreItem.name}</td>
                  <td>{scoreItem.score}</td>
                  <td>{formatDate(scoreItem.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No high scores yet. Be the first!</p>
        )}
      </div>
      
      <div className="result-actions">
        <button 
          className="btn btn-large play-again-btn"
          onClick={resetGame}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
