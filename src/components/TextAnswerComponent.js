import React, { useState, useEffect, useRef } from "react";
import Countdown from "react-countdown";

const TextAnswerComponent = ({
  readingTime, // Time allocated for reading the question
  timeLimit, // Time limit for answering the question
  onSubmit, // Callback function to handle answer submission
  goToSummary, // Function to navigate to the summary (not used in this snippet)
}) => {
  // State variables for timer color, countdown status, remaining time, answer text, etc.
  const [color, setTimerTextColor] = useState("black");
  const [isCountdownActive, setIsCountdownActive] = useState(true);
  const [remainingTime, setRemainingTime] = useState(timeLimit);
  const [answer, setAnswer] = useState("");
  const [timerText, setTimerText] = useState(timeLimit);
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const countdownStartTime = useRef(Date.now() + readingTime * 1000);
  const recordingTimer = useRef(null);

  // Timer for the main answering phase
  useEffect(() => {
    if (isTyping) {
      // Set up an interval to decrement the remaining time every second
      recordingTimer.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1;
          updateTimer(newTime); // Update timer display and color
          return newTime;
        });
      }, 1000);
    } else if (recordingTimer.current) {
      // Clear the interval if typing is stopped
      clearInterval(recordingTimer.current);
    }

    return () => clearInterval(recordingTimer.current);
  }, [isTyping]);

  // Function to update the timer display and color based on remaining time
  const updateTimer = (count) => {
    setTimerTextColor(count < 11 ? "red" : "black"); // Change color near time limit
    setTimerText(count > 0 ? count : "Time's Up"); // Update display text

    if (count <= 0) {
      submitAnswer(); // Automatically submit answer when time runs out
    }
  };

  // Function to start the answering phase after reading time
  const startAnswering = () => {
    setIsCountdownActive(false);
    setRemainingTime(timeLimit);
    setTimerText(timeLimit);
    setIsTyping(true);
    setIsSubmitted(false);
  };

  // Automatically start the countdown timer when the component mounts
  useEffect(() => {
    setIsCountdownActive(true);
    const readingTimer = setTimeout(() => {
      setIsCountdownActive(false);
      startAnswering(); // Start answering phase after reading time
    }, readingTime * 1000);

    return () => clearTimeout(readingTimer);
  }, [readingTime]);

  // Function to submit the answer and trigger the onSubmit callback
  const submitAnswer = () => {
    setIsTyping(false);
    setIsSubmitted(true);
    onSubmit(answer, timeLimit - remainingTime);
  };

  // Function to reset the component to its initial state
  const resetAnswer = () => {
    setAnswer("");
    setTimerText(timeLimit);
    setRemainingTime(timeLimit);
    setIsTyping(false);
    setIsSubmitted(false);
    setIsCountdownActive(true);

    const readingTimer = setTimeout(() => {
      setIsCountdownActive(false);
      startAnswering();
    }, readingTime * 1000);

    return () => clearTimeout(readingTimer);
  };

  // Renderer function for the countdown timer display
  const countdownTimer = ({ minutes, seconds, completed }) => {
    if (completed) {
      startAnswering(); // Start answering phase when countdown completes
      return <span>Start Answering!</span>;
    } else {
      return (
        <span
          style={{
            fontSize: "20px",
            color: "red",
            backgroundColor: "#555",
            padding: "6px",
            borderRadius: "8px",
            display: "inline-block",
            width: "40px",
            textAlign: "center",
          }}
        >
          {minutes > 0
            ? `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
            : seconds}
        </span>
      );
    }
  };

  return (
    <div>
      {/* Display countdown timer and skip button if countdown is active */}
      {!isTyping && isCountdownActive && (
        <div className="reading-time-container" style={{ fontSize: "18px" }}>
          {isCountdownActive && (
            <Countdown
              date={Date.now() + readingTime * 1000}
              renderer={countdownTimer}
            />
          )}
          {isCountdownActive && (
            <button
              onClick={startAnswering}
              className="btn"
              style={{
                backgroundColor: "#ffcccc",
                borderColor: "black",
                color: "black",
              }}
            >
              Skip Reading Time
            </button>
          )}
        </div>
      )}

      {/* Display timer text for answering phase */}
      <div className="timer-text">
        <h5 style={{ color }}>Answer Time: {timerText}</h5>
      </div>

      {/* Textarea for typing the answer */}
      <div className="text-input-container">
        {!isCountdownActive && (
          <textarea
            className="form-control"
            rows="10"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={!isTyping || remainingTime <= 0 || isSubmitted}
            placeholder="Start typing your answer here..."
          />
        )}
      </div>

      {/* Submit button for the answer */}
      <div className="button-container mt-4">
        {!isCountdownActive && !isSubmitted && remainingTime > 0 && (
          <button
            style={{ borderColor: "black" }}
            onClick={submitAnswer}
            className="btn btn-success me-2"
          >
            Submit Answer
          </button>
        )}
      </div>
    </div>
  );
};

export default TextAnswerComponent;
