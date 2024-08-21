import React, { useState, useEffect, useRef } from "react";
import Countdown from "react-countdown";

// TextAnswerComponent handles a timed text input for answers with a countdown
const TextAnswerComponent = ({
  readingTime,
  timeLimit,
  onSubmit,
  goToSummary,
}) => {
  const [color, setTimerTextColor] = useState("black"); // Color of the timer text
  const [isCountdownActive, setIsCountdownActive] = useState(true); // Whether the countdown is active
  const [remainingTime, setRemainingTime] = useState(timeLimit); // Remaining time for answering
  const [answer, setAnswer] = useState(""); // The user's answer
  const [timerText, setTimerText] = useState(timeLimit); // Displayed timer text
  const [isTyping, setIsTyping] = useState(false); // Indicates if the user is currently typing
  const [isSubmitted, setIsSubmitted] = useState(false); // Indicates if the answer has been submitted

  const countdownStartTime = useRef(Date.now() + readingTime * 1000); // Start time for countdown
  const timeLimitStartTime = useRef(null); // Start time for answering period
  const recordingTimer = useRef(null); // Timer for tracking typing duration

  // Timer for typing (main answer timer)
  useEffect(() => {
    if (isTyping) {
      // Update the remaining time every second while typing
      recordingTimer.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1;
          updateTimer(newTime);
          return newTime;
        });
      }, 1000);
    } else if (recordingTimer.current) {
      // Clear the timer when typing stops
      clearInterval(recordingTimer.current);
    }

    return () => clearInterval(recordingTimer.current); // Cleanup on unmount
  }, [isTyping]);

  // Update the timer text and color based on the remaining time
  const updateTimer = (count) => {
    setTimerTextColor(count < 11 ? "red" : "black"); // Change color when time is less than 11 seconds
    setTimerText(count > 0 ? count : "Time's Up"); // Update timer text

    if (count <= 0) {
      submitAnswer(); // Submit the answer when time runs out
    }
  };

  // Start the time limit timer after reading time is over
  const startAnswering = () => {
    setIsCountdownActive(false);
    timeLimitStartTime.current = Date.now() + timeLimit * 1000;
    setRemainingTime(timeLimit);
    setTimerText(timeLimit);
    setIsTyping(true);
    setIsSubmitted(false);
  };

  // Automatically start the countdown when the component mounts
  useEffect(() => {
    setIsCountdownActive(true);
    countdownStartTime.current = Date.now() + readingTime * 1000;
    const readingTimer = setTimeout(() => {
      setIsCountdownActive(false);
      startAnswering(); // Begin answering phase after reading time
    }, readingTime * 1000);

    return () => clearTimeout(readingTimer); // Cleanup on unmount
  }, [readingTime]);

  // Handle answer submission
  const submitAnswer = () => {
    setIsTyping(false);
    setIsSubmitted(true);
    onSubmit(answer, timeLimit - remainingTime); // Call the onSubmit handler with answer and elapsed time
  };

  // Reset the answer and timers
  const resetAnswer = () => {
    setAnswer("");
    setTimerText(timeLimit);
    setRemainingTime(timeLimit);
    setIsTyping(false);
    setIsSubmitted(false);
    setIsCountdownActive(true);

    countdownStartTime.current = Date.now() + readingTime * 1000;
    const readingTimer = setTimeout(() => {
      setIsCountdownActive(false);
      startAnswering(); // Restart answering phase
    }, readingTime * 1000);

    return () => clearTimeout(readingTimer); // Cleanup on unmount
  };

  // Render countdown timer or message based on countdown status
  const countdownTimer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <span>Start Answering!</span>;
    } else {
      return (
        <span>
          {minutes > 0
            ? `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
            : seconds}
        </span>
      );
    }
  };

  return (
    <div>
      <div className="timer-text">
        <h2 style={{ color }}>{timerText}</h2>
      </div>

      <div className="text-input-container">
        {isCountdownActive && (
          <div className="overlay-text">
            <Countdown
              date={countdownStartTime.current}
              renderer={countdownTimer}
            />
          </div>
        )}

        {!isCountdownActive && (
          <textarea
            className="form-control"
            rows="10"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={
              !isTyping ||
              remainingTime <= 0 ||
              isCountdownActive ||
              isSubmitted
            }
            placeholder="Start typing your answer here..."
          />
        )}
      </div>

      <div className="button-container mt-4">
        {!isCountdownActive && (
          <>
            {!isSubmitted && remainingTime > 0 && (
              <button onClick={submitAnswer} className="btn btn-success me-2">
                Submit Answer
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TextAnswerComponent;
