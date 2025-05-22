/**
 * Helper functions for the QuizRush trivia game
 */
import { POINTS, API } from './constants';

/**
 * PUBLIC_INTERFACE
 * Fetches questions from the Open Trivia Database API
 * @param {number} amount - Number of questions to fetch
 * @param {number} category - Category ID
 * @param {string} difficulty - Difficulty level (easy, medium, hard)
 * @returns {Promise} - Promise that resolves to question data
 */
export const fetchQuestions = async (amount, category, difficulty) => {
  try {
    const url = `${API.BASE_URL}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.response_code === 0) {
      return processQuestions(data.results);
    } else {
      throw new Error('Failed to fetch questions');
    }
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

/**
 * Processes raw question data from the API
 * @param {Array} questions - Raw questions from API
 * @returns {Array} - Processed questions with shuffled answers
 */
const processQuestions = (questions) => {
  return questions.map(question => {
    // Decode HTML entities in questions and answers
    const processedQuestion = {
      question: decodeHTML(question.question),
      correctAnswer: decodeHTML(question.correct_answer),
      category: question.category,
      difficulty: question.difficulty
    };
    
    // Combine and shuffle answers
    const allAnswers = [
      ...question.incorrect_answers.map(answer => decodeHTML(answer)),
      processedQuestion.correctAnswer
    ];
    
    processedQuestion.answers = shuffleArray(allAnswers);
    return processedQuestion;
  });
};

/**
 * PUBLIC_INTERFACE
 * Shuffles an array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * PUBLIC_INTERFACE
 * Calculates score for a correct answer
 * @param {number} timeLeft - Seconds left on the timer
 * @param {number} streak - Current streak of correct answers
 * @returns {number} - Calculated score
 */
export const calculateScore = (timeLeft, streak) => {
  let score = POINTS.CORRECT_ANSWER;
  
  // Add time bonus
  score += Math.floor(timeLeft * POINTS.TIME_BONUS_MULTIPLIER);
  
  // Add streak bonus if applicable
  if (streak >= POINTS.STREAK_THRESHOLD) {
    score = Math.floor(score * POINTS.STREAK_MULTIPLIER);
  }
  
  return score;
};

/**
 * PUBLIC_INTERFACE
 * Formats time in seconds to MM:SS format
 * @param {number} seconds - Time in seconds
 * @returns {string} - Formatted time string
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Decodes HTML entities in a string
 * @param {string} html - String with HTML entities
 * @returns {string} - Decoded string
 */
const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

/**
 * PUBLIC_INTERFACE
 * Gets a random encouraging message for correct answers
 * @returns {string} - Encouraging message
 */
export const getEncouragingMessage = () => {
  const messages = [
    'Great job!',
    'You\'re on fire!',
    'Impressive!',
    'Excellent!',
    'Fantastic!',
    'Brilliant!',
    'You\'re a genius!',
    'Incredible!',
    'Amazing work!',
    'Perfect!'
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

/**
 * PUBLIC_INTERFACE
 * Saves high score to local storage
 * @param {object} scoreData - Score data with player name, score, etc.
 */
export const saveHighScore = (scoreData) => {
  try {
    const highScores = getHighScores();
    highScores.push(scoreData);
    
    // Sort by score (descending)
    highScores.sort((a, b) => b.score - a.score);
    
    // Keep only top 10 scores
    const topScores = highScores.slice(0, 10);
    
    localStorage.setItem('quizrush_high_scores', JSON.stringify(topScores));
  } catch (error) {
    console.error('Error saving high score:', error);
  }
};

/**
 * PUBLIC_INTERFACE
 * Gets high scores from local storage
 * @returns {Array} - Array of high score objects
 */
export const getHighScores = () => {
  try {
    const scores = localStorage.getItem('quizrush_high_scores');
    return scores ? JSON.parse(scores) : [];
  } catch (error) {
    console.error('Error getting high scores:', error);
    return [];
  }
};
