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
  const timeLimitStartTime = useRef(null);
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

    countdownStartTime.current = Date.now() + readingTime * 1000;
    const readingTimer = setTimeout(() => {
      setIsCountdownActive(false);
      startAnswering();
    }, readingTime * 1000);

    return () => clearTimeout(readingTimer);
  };

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
          <div
            className="overlay-text"
            style={{
              marginLeft: "130px",
              marginTop: "50px",
            }}
          >
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
        {isCountdownActive && (
          <button onClick={startAnswering} className="btn btn-primary me-2">
            Skip Reading
          </button>
        )}
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
