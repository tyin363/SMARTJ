import React, { useState, useEffect, useRef } from "react";
import Countdown from "react-countdown";

const TextAnswerComponent = ({
  readingTime,
  timeLimit,
  onSubmit,
  goToSummary,
}) => {
  const [color, setTimerTextColor] = useState("black");
  const [isCountdownActive, setIsCountdownActive] = useState(true);
  const [remainingTime, setRemainingTime] = useState(timeLimit);
  const [answer, setAnswer] = useState("");
  const [timerText, setTimerText] = useState(timeLimit);
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const countdownStartTime = useRef(Date.now() + readingTime * 1000);
  const recordingTimer = useRef(null);

  // Timer for typing (main answer timer)
  useEffect(() => {
    if (isTyping) {
      recordingTimer.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1;
          updateTimer(newTime);
          return newTime;
        });
      }, 1000);
    } else if (recordingTimer.current) {
      clearInterval(recordingTimer.current);
    }

    return () => clearInterval(recordingTimer.current);
  }, [isTyping]);

  // Update the timer text and color
  const updateTimer = (count) => {
    setTimerTextColor(count < 11 ? "red" : "black");
    setTimerText(count > 0 ? count : "Time's Up");

    if (count <= 0) {
      submitAnswer();
    }
  };

  // Automatically start the time limit timer after reading time
  const startAnswering = () => {
    setIsCountdownActive(false);
    setRemainingTime(timeLimit);
    setTimerText(timeLimit);
    setIsTyping(true);
    setIsSubmitted(false);
  };

  // Automatically start the countdown when the component mounts
  useEffect(() => {
    setIsCountdownActive(true);
    const readingTimer = setTimeout(() => {
      setIsCountdownActive(false);
      startAnswering();
    }, readingTime * 1000);

    return () => clearTimeout(readingTimer);
  }, [readingTime]);

  const submitAnswer = () => {
    setIsTyping(false);
    setIsSubmitted(true);
    onSubmit(answer, timeLimit - remainingTime);
  };

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

  const countdownTimer = ({ minutes, seconds, completed }) => {
    if (completed) {
      startAnswering();
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

      <div className="timer-text">
        <h5 style={{ color }}>Answer Time: {timerText}</h5>
      </div>

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

      <div className="button-container mt-4">
        {!isCountdownActive && !isSubmitted && remainingTime > 0 && (
          <button style={{borderColor: "black"}} onClick={submitAnswer} className="btn btn-success me-2 ">
            Submit Answer
          </button>
        )}
      </div>
    </div>
  );
};

export default TextAnswerComponent;
