import React from 'react';

/**
 * DifficultySelect component for selecting game difficulty
 */
const DifficultySelect = ({ difficulties, selectedDifficulty, onSelectDifficulty }) => {
  const handleClick = (difficultyId) => {
    onSelectDifficulty(difficultyId);
  };

  return (
    <div className="difficulty-select">
      {difficulties.map(difficulty => (
        <button
          key={difficulty.id}
          className={`difficulty-btn ${selectedDifficulty === difficulty.id ? 'selected' : ''}`}
          onClick={() => handleClick(difficulty.id)}
        >
          <div className="difficulty-name">{difficulty.name}</div>
          <div className="difficulty-time">{difficulty.timePerQuestion}s per question</div>
        </button>
      ))}
    </div>
  );
};

export default DifficultySelect;
