import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Countdown from "react-countdown";
import "../InterviewPractice.css"; // Ensure this CSS is correctly applied

function TextAnswerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const timeLimit = location.state?.timeLimit || 120; // Set time limit for answering
  const [color, setTimerTextColor] = useState("black");
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(timeLimit);
  const [timerText, setTimerText] = useState(timeLimit);
  const [answer, setAnswer] = useState("");
  const [isInitialCountdown, setIsInitialCountdown] = useState(true);
  const recordingTimer = useRef(null);

  useEffect(() => {
    if (isCountdownActive) {
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
  }, [isCountdownActive]);

  const updateTimer = (count) => {
    setTimerTextColor(count < 11 ? "red" : "black");
    setTimerText(count > 0 ? count : "Time's Up");

    if (count <= 0) {
      submitAnswer();
    }
  };

  useEffect(() => {
    // Start the initial countdown automatically
    startInitialCountdown();
  }, []);

  function startInitialCountdown() {
    setIsInitialCountdown(true);
    setTimeout(() => {
      setIsInitialCountdown(false);
      startAnsweringTimer();
    }, 3000); // 3-second initial countdown
  }

  function startAnsweringTimer() {
    setIsCountdownActive(true);
    setTimerText(timeLimit);
    setTimerTextColor("black");
  }

  function submitAnswer() {
    setIsCountdownActive(false);
    navigate("/summary", {
      state: {
        answer: answer,
        duration: timeLimit - remainingTime,
        date: new Date().toLocaleDateString(),
        question: "Tell me about a challenging project you've worked on.",
      },
    });
  }

  function countdownTimer({ seconds, completed }) {
    if (completed) {
      return <span>Start Answering!</span>;
    } else {
      return <span>{seconds}</span>;
    }
  }

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Interview Practice - Text Answer</h1>
      <p className="lead">Type your response to the practice questions.</p>
      <div className="timer-text">
        <h2 style={{ color }}>{timerText}</h2>
      </div>

      <div className="text-input-container">
        {isInitialCountdown && (
          <div className="overlay-text">
            <Countdown date={Date.now() + 3000} renderer={countdownTimer} />
          </div>
        )}

        {!isInitialCountdown && (
          <textarea
            className="form-control"
            rows="10"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={remainingTime <= 0}
            placeholder="Start typing your answer here..."
          />
        )}
      </div>
      <div className="button-container mt-4">
        {!isInitialCountdown && remainingTime > 0 && (
          <button onClick={submitAnswer} className="btn btn-success">
            Submit Answer
          </button>
        )}
      </div>
    </div>
  );
}

export default TextAnswerPage;
