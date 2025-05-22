import React, { useState } from 'react';
import CategorySelect from '../components/CategorySelect';
import DifficultySelect from '../components/DifficultySelect';
import { useGame } from '../context/GameContext';
import { QUIZ_CATEGORIES, DIFFICULTY_LEVELS } from '../utils/constants';

/**
 * StartScreen component for the game's initial screen
 * Allows players to select category, difficulty, and start the game
 */
const StartScreen = () => {
  const { startGame, updateSettings, state } = useGame();
  const { settings } = state;
  
  const [playerName, setPlayerName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(settings.category);
  const [selectedDifficulty, setSelectedDifficulty] = useState(settings.difficulty);
  
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(parseInt(categoryId));
    updateSettings({ category: parseInt(categoryId) });
  };
  
  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    updateSettings({ difficulty });
  };
  
  const handleStartGame = () => {
    // Save player name if entered
    if (playerName.trim()) {
      localStorage.setItem('quizrush_player_name', playerName.trim());
    }
    
    startGame();
  };
  
  // Get category name from ID
  const getCategoryName = (categoryId) => {
    const category = QUIZ_CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };
  
  // Get difficulty display name
  const getDifficultyName = (difficultyId) => {
    const difficulty = DIFFICULTY_LEVELS.find(diff => diff.id === difficultyId);
    return difficulty ? difficulty.name : 'Unknown Difficulty';
  };

  return (
    <div className="start-screen">
      <div className="game-logo">
        <span className="logo-symbol">⚡</span>
        <h1 className="logo-title">QuizRush</h1>
      </div>
      
      <div className="subtitle">The Ultimate Trivia Challenge</div>
      
      <div className="game-description">
        <p>
          Test your knowledge in this fast-paced, adrenaline-pumping trivia game! 
          Answer questions from various categories while racing against the clock.
          Score points for correct answers and earn bonuses for streaks and quick responses.
        </p>
      </div>
      
      <div className="game-settings">
        <div className="setting-group">
          <label htmlFor="player-name">Your Name (Optional)</label>
          <input 
            type="text" 
            id="player-name" 
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            className="player-name-input"
            maxLength={15}
          />
        </div>
        
        <div className="setting-group">
          <label>Select Category</label>
          <CategorySelect 
            categories={QUIZ_CATEGORIES}
            selectedCategory={selectedCategory} 
            onSelectCategory={handleCategoryChange} 
          />
        </div>
        
        <div className="setting-group">
          <label>Select Difficulty</label>
          <DifficultySelect 
            difficulties={DIFFICULTY_LEVELS}
            selectedDifficulty={selectedDifficulty} 
            onSelectDifficulty={handleDifficultyChange} 
          />
        </div>
      </div>
      
      <div className="game-summary">
        <p>
          <strong>Category:</strong> {getCategoryName(selectedCategory)}
        </p>
        <p>
          <strong>Difficulty:</strong> {getDifficultyName(selectedDifficulty)}
        </p>
        <p>
          <strong>Questions:</strong> {settings.questionsPerRound}
        </p>
      </div>
      
      <button 
        className="btn btn-large start-game-btn"
        onClick={handleStartGame}
      >
        Start Game!
      </button>
    </div>
  );
};

export default StartScreen;
