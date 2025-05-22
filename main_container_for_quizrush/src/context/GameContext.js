import React, { createContext, useContext, useReducer } from 'react';
import { GAME_STATES, DEFAULT_SETTINGS } from '../utils/constants';
import { fetchQuestions } from '../utils/helpers';

const GameContext = createContext();

// Initial game state
const initialState = {
  gameState: GAME_STATES.START,
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  streak: 0,
  timeLeft: 0,
  settings: {
    category: DEFAULT_SETTINGS.defaultCategory,
    difficulty: DEFAULT_SETTINGS.defaultDifficulty,
    questionsPerRound: DEFAULT_SETTINGS.questionsPerRound
  },
  loading: false,
  error: null
};

// Reducer for game state management
function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_GAME_STATE':
      return { ...state, gameState: action.payload };
    
    case 'SET_QUESTIONS':
      return { 
        ...state, 
        questions: action.payload,
        currentQuestionIndex: 0,
        loading: false
      };
    
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        timeLeft: action.payload.timeLeft || state.timeLeft
      };
    
    case 'UPDATE_SCORE':
      return {
        ...state,
        score: state.score + action.payload.points,
        streak: action.payload.isCorrect ? state.streak + 1 : 0
      };
    
    case 'SET_TIME_LEFT':
      return { ...state, timeLeft: action.payload };
    
    case 'UPDATE_SETTINGS':
      return { 
        ...state, 
        settings: { ...state.settings, ...action.payload } 
      };
    
    case 'START_LOADING':
      return { ...state, loading: true, error: null };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'RESET_GAME':
      return { 
        ...initialState,
        settings: state.settings // Preserve user settings
      };
      
    default:
      return state;
  }
}

// Provider component
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  // Derived values
  const isGameActive = state.gameState === GAME_STATES.PLAYING;
  const isGameOver = state.gameState === GAME_STATES.GAME_OVER;
  const currentQuestion = state.questions[state.currentQuestionIndex];
  const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1;
  
  // Actions
  const startGame = async () => {
    dispatch({ type: 'SET_GAME_STATE', payload: GAME_STATES.PLAYING });
    dispatch({ type: 'START_LOADING' });
    
    try {
      const { category, difficulty, questionsPerRound } = state.settings;
      const questions = await fetchQuestions(questionsPerRound, category, difficulty);
      dispatch({ type: 'SET_QUESTIONS', payload: questions });
      
      // Set initial time based on difficulty
      const difficultyTimeMap = {
        easy: 30,
        medium: 20,
        hard: 15
      };
      dispatch({ type: 'SET_TIME_LEFT', payload: difficultyTimeMap[difficulty] });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };
  
  const answerQuestion = (answer, timeLeft) => {
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    dispatch({ 
      type: 'UPDATE_SCORE',
      payload: { 
        isCorrect,
        points: isCorrect ? calculatePoints(timeLeft, state.streak) : 0
      }
    });
    
    if (isLastQuestion) {
      endGame();
    } else {
      goToNextQuestion(timeLeft);
    }
    
    return isCorrect;
  };
  
  const calculatePoints = (timeLeft, streak) => {
    // Base points for correct answer
    let points = 10;
    
    // Time bonus: 0.5 points per second left
    points += Math.floor(timeLeft * 0.5);
    
    // Streak bonus: 1.5x multiplier after 3 consecutive correct answers
    if (streak >= 2) { // This will be the third correct answer
      points = Math.floor(points * 1.5);
    }
    
    return points;
  };
  
  const goToNextQuestion = (timeLeft) => {
    dispatch({ type: 'NEXT_QUESTION', payload: { timeLeft } });
  };
  
  const endGame = () => {
    dispatch({ type: 'SET_GAME_STATE', payload: GAME_STATES.GAME_OVER });
  };
  
  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };
  
  const updateSettings = (newSettings) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: newSettings });
  };
  
  const updateTimeLeft = (timeLeft) => {
    dispatch({ type: 'SET_TIME_LEFT', payload: timeLeft });
  };

  // Value to be provided to consumers
  const value = {
    state,
    isGameActive,
    isGameOver,
    currentQuestion,
    isLastQuestion,
    startGame,
    answerQuestion,
    resetGame,
    updateSettings,
    updateTimeLeft
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook for using the game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
