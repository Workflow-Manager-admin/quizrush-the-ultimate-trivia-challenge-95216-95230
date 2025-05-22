import React, { useState } from 'react';

/**
 * Component to display and manage answer options for a question
 */
const AnswerOptions = ({ answers, correctAnswer, onAnswerSelected }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const handleAnswerClick = (answer) => {
    if (selectedAnswer) return; // Prevent multiple selections
    
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    // Show feedback briefly before moving to next question
    setTimeout(() => {
      onAnswerSelected(answer);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }, 1000);
  };
  
  const getAnswerClass = (answer) => {
    if (!showFeedback || selectedAnswer !== answer) {
      return selectedAnswer === answer ? 'selected' : '';
    }
    
    return answer === correctAnswer ? 'correct' : 'incorrect';
  };

  return (
    <div className="answer-options">
      {answers.map((answer, index) => (
        <button
          key={index}
          className={`answer-option ${getAnswerClass(answer)}`}
          onClick={() => handleAnswerClick(answer)}
          disabled={selectedAnswer !== null}
        >
          {answer}
        </button>
      ))}
    </div>
  );
};

export default AnswerOptions;
