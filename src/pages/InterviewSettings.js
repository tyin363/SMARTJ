import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../InterviewSettings.css";

function InterviewSettings() {
  // Default number of questions
  const [numQuestions, setNumQuestions] = useState(3); 
  // Default question type
  const [questionType, setQuestionType] = useState("Behavioural"); 
  const [readingTime, setReadingTime] = useState(40); 
  // Default answer time in seconds
  const [answerTime, setAnswerTime] = useState(120); 
  // Default answer type
  const [answerType, setAnswerType] = useState("Text"); 
  const questionTypes = ["Technical", "Behavioural"];
  const answerTypes = ["Text", "Voice", "Video"];

  const handleArrowClick = (setter, value, delta) => {
    // Ensure values don't go below 1
    setter(Math.max(1, value + delta)); 
  };

  const handleTypeChange = (currentType, types, setter, delta) => {
    const currentIndex = types.indexOf(currentType);
    const nextIndex = (currentIndex + delta + types.length) % types.length;
    setter(types[nextIndex]);
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Interview Settings</h1>

      <div className="settings mt-4">
        {/* Number of Questions */}
        <div className="setting">
          <h4>Number of Questions: {numQuestions}</h4>
          <button
            onClick={() => handleArrowClick(setNumQuestions, numQuestions, -1)}
          >
            &lt;
          </button>
          <button
            onClick={() => handleArrowClick(setNumQuestions, numQuestions, 1)}
          >
            &gt;
          </button>
        </div>

        {/* Question Type */}
        <div className="setting">
          <h4>Question Type: {questionType}</h4>
          <button
            onClick={() =>
              handleTypeChange(questionType, questionTypes, setQuestionType, -1)
            }
          >
            &lt;
          </button>
          <button
            onClick={() =>
              handleTypeChange(questionType, questionTypes, setQuestionType, 1)
            }
          >
            &gt;
          </button>
        </div>

        {/* Reading Time */}
        <div className="setting">
          <h4>Reading Time: {readingTime} seconds</h4>
          <button
            onClick={() => handleArrowClick(setReadingTime, readingTime, -10)}
          >
            &lt;
          </button>
          <button
            onClick={() => handleArrowClick(setReadingTime, readingTime, 10)}
          >
            &gt;
          </button>
        </div>

        {/* Answer Time */}
        <div className="setting">
          <h4>Answer Time: {answerTime} seconds</h4>
          <button
            onClick={() => handleArrowClick(setAnswerTime, answerTime, -10)}
          >
            &lt;
          </button>
          <button
            onClick={() => handleArrowClick(setAnswerTime, answerTime, 10)}
          >
            &gt;
          </button>
        </div>

        {/* Answer Type */}
        <div className="setting">
          <h4>Answer Type: {answerType}</h4>
          <button
            onClick={() =>
              handleTypeChange(answerType, answerTypes, setAnswerType, -1)
            }
          >
            &lt;
          </button>
          <button
            onClick={() =>
              handleTypeChange(answerType, answerTypes, setAnswerType, 1)
            }
          >
            &gt;
          </button>
        </div>

        <button className="btn btn-primary mt-4">
          <Link
            className="nav-link"
            to={`/interview-practice?questionType=${encodeURIComponent(
              questionType
            )}&numQuestions=${numQuestions}&readingTime=${readingTime}&answerTime=${answerTime}&answerType=${encodeURIComponent(
              answerType
            )}`}
          >
            Start Interview
          </Link>
        </button>
      </div>
    </div>
  );
}

export default InterviewSettings;
