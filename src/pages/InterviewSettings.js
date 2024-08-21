import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../InterviewSettings.css";

function InterviewSettings() {
  // State for number of questions, defaulting to 3
  const [numQuestions, setNumQuestions] = useState(3);
  // State for question type, defaulting to "Behavioural"
  const [questionType, setQuestionType] = useState("Behavioural");
  // State for reading time in seconds, defaulting to 40 seconds
  const [readingTime, setReadingTime] = useState(40);
  // State for answer time in seconds, defaulting to 120 seconds
  const [answerTime, setAnswerTime] = useState(120);
  // State for answer type, defaulting to "Text"
  const [answerType, setAnswerType] = useState("Text");

  // Arrays for question and answer types
  const questionTypes = ["Technical", "Behavioural"];
  const answerTypes = ["Text", "Video"];

  // Function to handle incrementing or decrementing numerical settings
  const handleArrowClick = (setter, value, delta) => {
    // Ensure values don't go below 1
    setter(Math.max(1, value + delta));
  };

  // Function to handle changing the type settings (question or answer type)
  const handleTypeChange = (currentType, types, setter, delta) => {
    const currentIndex = types.indexOf(currentType);
    // Calculate next index with wrap-around using modulo operator
    const nextIndex = (currentIndex + delta + types.length) % types.length;
    setter(types[nextIndex]);
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Interview Settings</h1>

      <div className="settings mt-4">
        {/* Section for setting number of questions */}
        <div className="setting">
          <h4>Number of Questions: {numQuestions}</h4>
          <button
            onClick={() => handleArrowClick(setNumQuestions, numQuestions, -1)}
            disabled={numQuestions <= 1} // Disable if <= 1
          >
            &lt;
          </button>
          <button
            onClick={() => handleArrowClick(setNumQuestions, numQuestions, 1)}
          >
            &gt;
          </button>
        </div>

        {/* Section for setting question type */}
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

        {/* Section for setting reading time */}
        <div className="setting">
          <h4>Reading Time: {readingTime} seconds</h4>
          <button
            onClick={() => handleArrowClick(setReadingTime, readingTime, -10)}
            disabled={readingTime <= 10} // Disable if <= 10
          >
            &lt;
          </button>
          <button
            onClick={() => handleArrowClick(setReadingTime, readingTime, 10)}
          >
            &gt;
          </button>
        </div>

        {/* Section for setting answer time */}
        <div className="setting">
          <h4>Answer Time: {answerTime} seconds</h4>
          <button
            onClick={() => handleArrowClick(setAnswerTime, answerTime, -10)}
            disabled={answerTime <= 10} // Disable if <= 10
          >
            &lt;
          </button>
          <button
            onClick={() => handleArrowClick(setAnswerTime, answerTime, 10)}
          >
            &gt;
          </button>
        </div>

        {/* Section for setting answer type */}
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

        {/* Button to start the interview with the selected settings */}
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
