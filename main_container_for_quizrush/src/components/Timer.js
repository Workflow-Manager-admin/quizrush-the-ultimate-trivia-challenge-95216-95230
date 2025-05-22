import React, { useEffect, useState } from 'react';
import { formatTime } from '../utils/helpers';
import { useGame } from '../context/GameContext';

/**
 * Timer component to display and manage the countdown for each question
 */
const Timer = ({ onTimeUp }) => {
  const { state, updateTimeLeft } = useGame();
  const [timeLeft, setTimeLeft] = useState(state.timeLeft);
  
  // Calculate percentage of time remaining for progress bar
  const getTimePercentage = () => {
    const { difficulty } = state.settings;
    const totalTime = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 20 : 15;
    return (timeLeft / totalTime) * 100;
  };
  
  // Determine color based on time remaining
  const getTimerColor = () => {
    const percentage = getTimePercentage();
    if (percentage > 60) return '#4CAF50'; // green
    if (percentage > 30) return '#FF9800'; // orange
    return '#F44336'; // red
  };

  useEffect(() => {
    // Reset timer when current question changes
    setTimeLeft(state.timeLeft);
  }, [state.currentQuestionIndex, state.timeLeft]);

  useEffect(() => {
    // Count down timer
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timerInterval = setInterval(() => {
      setTimeLeft(prevTime => {
        const newTime = prevTime - 1;
        updateTimeLeft(newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft, onTimeUp, updateTimeLeft]);

  return (
    <div className="timer-container">
      <div className="timer-bar-container">
        <div 
          className="timer-bar" 
          style={{ 
            width: `${getTimePercentage()}%`,
            backgroundColor: getTimerColor(),
            transition: 'width 1s linear, background-color 1s'
          }}
        />
      </div>
      <div className="timer-text">{formatTime(timeLeft)}</div>
    </div>
  );
};

export default Timer;
