import React from 'react';
import './App.css';
import './components/components.css';
import { GameProvider, useGame } from './context/GameContext';
import StartScreen from './containers/StartScreen';
import GameScreen from './containers/GameScreen';
import ResultScreen from './containers/ResultScreen';
import { GAME_STATES } from './utils/constants';

/**
 * Main QuizGame component that acts as a router between different game screens
 */
const QuizGame = () => {
  const { state } = useGame();
  const { gameState } = state;

  // Render the appropriate screen based on game state
  const renderGameScreen = () => {
    switch(gameState) {
      case GAME_STATES.START:
        return <StartScreen />;
      case GAME_STATES.PLAYING:
        return <GameScreen />;
      case GAME_STATES.GAME_OVER:
        return <ResultScreen />;
      default:
        return <StartScreen />;
    }
  };

  return (
    <div className="quiz-game">
      <div className="container game-container">
        {renderGameScreen()}
      </div>
    </div>
  );
};

/**
 * Main App component - wraps the game with our context provider
 */
function App() {
  return (
    <div className="app">
      <GameProvider>
        <QuizGame />
      </GameProvider>
    </div>
  );
}

export default App;