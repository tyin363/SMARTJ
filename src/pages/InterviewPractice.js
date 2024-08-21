import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuestionComponent from "../components/QuestionComponent";
import VideoRecordingComponent from "../components/VideoRecordingComponent";
import TextAnswerComponent from "../components/TextAnswerComponent";
import "../InterviewPractice.css";

function InterviewPractice() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const questionType = queryParams.get("questionType") || "Behavioural";
  const answerType = queryParams.get("answerType") || "Text";
  const [count, setCount] = useState(0);
  const numQuestions = parseInt(queryParams.get("numQuestions"), 10) || 3;
  const timeLimit = parseInt(queryParams.get("answerTime"), 10) || 120;
  const readingTime = parseInt(queryParams.get("readingTime"), 10) || 40;

  // State to manage recorded video chunks and text answers
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [textAnswer, setTextAnswer] = useState("");
  const [textAnswerDuration, setTextAnswerDuration] = useState(0);

  // Function to navigate to the summary page with collected data
  function goToSummary() {
    const duration =
      answerType === "Text"
        ? textAnswerDuration
        : timeLimit - recordedChunks.length;
    navigate("/summary", {
      state: {
        answer: textAnswer,
        duration: duration,
        date: new Date().toLocaleDateString(),
        question: "Tell me about a challenging project you've worked on.",
      },
    });
  }

  // Handler for submitting text answers
  const handleTextSubmit = (answer, duration) => {
    setTextAnswer(answer);
    setTextAnswerDuration(duration);
  };

  // Increment question count and handle navigation to summary
  const increment = () => {
    if (count < numQuestions - 1) {
      setCount(count + 1);
    } else {
      goToSummary();
    }
  };

  return (
    <div className="container text-center mt-5">
      <div className="row justify-content-center">
        {/* Left side: Display the interview question */}
        <div
          className="col-md-5 d-flex flex-column justify-content-center align-items-center p-4"
          style={{
            borderRadius: "10px",
            minHeight: "400px",
            backgroundColor: "#f8f9fa", // Light background for question section
            border: "2px solid black", // Border for question section
          }}
        >
          <div className="question-section text-center">
            {/* Display the current question based on the type */}
            <QuestionComponent
              key={`${questionType}-${count}`} // Unique key to force re-render
              questionType={questionType}
            />
          </div>
          <div className="button-container mt-4">
            {/* Button to move to the next question or finish */}
            {count < numQuestions - 1 ? (
              <button
                style={{
                  border: "2px solid black", // Border for button
                }}
                onClick={increment}
                className="btn btn-primary"
              >
                Next Question
              </button>
            ) : (
              <button
                style={{
                  border: "2px solid black", // Border for button
                }}
                onClick={goToSummary}
                className="btn btn-success"
              >
                Finish
              </button>
            )}
          </div>
        </div>

        {/* Right side: Display the answer component based on answer type */}
        <div
          className="col-md-5 p-4 ml-2"
          style={{
            borderRadius: "10px",
            backgroundColor: "#ebecf0",
            border: "2px solid black", // Border for answer section
          }}
        >
          {answerType === "Text" ? (
            <TextAnswerComponent
              key={`text-${count}`} // Unique key to force re-render
              readingTime={readingTime}
              timeLimit={timeLimit}
              onSubmit={handleTextSubmit}
              goToSummary={goToSummary}
            />
          ) : (
            <VideoRecordingComponent
              key={`video-${count}`} // Unique key to force re-render
              readingTime={readingTime}
              timeLimit={timeLimit}
              setRecordedChunks={setRecordedChunks}
              recordedChunks={recordedChunks}
              goToSummary={goToSummary}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default InterviewPractice;
