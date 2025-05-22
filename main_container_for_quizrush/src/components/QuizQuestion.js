import React from 'react';
import Timer from './Timer';
import AnswerOptions from './AnswerOptions';
import { useGame } from '../context/GameContext';

/**
 * QuizQuestion component that displays the current question and answer options
 */
const QuizQuestion = () => {
  const { currentQuestion, answerQuestion } = useGame();
  
  if (!currentQuestion) {
    return <div className="loading">Loading question...</div>;
  }

  const handleTimeUp = () => {
    // Time's up, move to next question without points
    answerQuestion(null, 0);
  };
  
  const handleAnswerSelected = (answer) => {
    // User selected an answer
    answerQuestion(answer, document.querySelector('.timer-text')?.textContent || '00:00');
  };

  return (
    <div className="quiz-question">
      <Timer onTimeUp={handleTimeUp} />
      
      <div className="question-category">
        {currentQuestion.category}
      </div>
      
      <h2 className="question-text">{currentQuestion.question}</h2>
      
      <AnswerOptions 
        answers={currentQuestion.answers}
        correctAnswer={currentQuestion.correctAnswer}
        onAnswerSelected={handleAnswerSelected}
      />
    </div>
  );
};

export default QuizQuestion;
