/**
 * Quiz game constants and configuration
 */

// Difficulty levels
export const DIFFICULTY_LEVELS = [
  { id: 'easy', name: 'Easy', timePerQuestion: 30 },
  { id: 'medium', name: 'Medium', timePerQuestion: 20 },
  { id: 'hard', name: 'Hard', timePerQuestion: 15 }
];

// Quiz categories
export const QUIZ_CATEGORIES = [
  { id: 9, name: 'General Knowledge' },
  { id: 10, name: 'Entertainment: Books' },
  { id: 11, name: 'Entertainment: Film' },
  { id: 12, name: 'Entertainment: Music' },
  { id: 14, name: 'Entertainment: Television' },
  { id: 15, name: 'Entertainment: Video Games' },
  { id: 17, name: 'Science & Nature' },
  { id: 18, name: 'Science: Computers' },
  { id: 19, name: 'Science: Mathematics' },
  { id: 21, name: 'Sports' },
  { id: 22, name: 'Geography' },
  { id: 23, name: 'History' },
  { id: 24, name: 'Politics' },
  { id: 27, name: 'Animals' },
  { id: 28, name: 'Vehicles' },
  { id: 31, name: 'Entertainment: Anime & Manga' }
];

// Game states
export const GAME_STATES = {
  START: 'start',
  PLAYING: 'playing',
  GAME_OVER: 'game_over'
};

// Points
export const POINTS = {
  CORRECT_ANSWER: 10,
  TIME_BONUS_MULTIPLIER: 0.5, // points per second left
  STREAK_THRESHOLD: 3,       // consecutive correct answers to start streak
  STREAK_MULTIPLIER: 1.5     // multiplier for streak bonus
};

// Animation durations (in milliseconds)
export const ANIMATIONS = {
  QUESTION_TRANSITION: 500,
  ANSWER_FEEDBACK: 1000
};

// API configuration
export const API = {
  BASE_URL: 'https://opentdb.com/api.php'
};

// Default game settings
export const DEFAULT_SETTINGS = {
  questionsPerRound: 10,
  defaultDifficulty: 'medium',
  defaultCategory: 9, // General Knowledge
};

// Local storage keys
export const STORAGE_KEYS = {
  HIGH_SCORES: 'quizrush_high_scores',
  SETTINGS: 'quizrush_settings'
};
