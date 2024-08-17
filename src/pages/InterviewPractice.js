import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuestionComponent from "../components/QuestionComponent";
import VideoRecordingComponent from "../components/VideoRecordingComponent";
import TextAnswerComponent from "../components/TextAnswerComponent"; 
import "../InterviewPractice.css";

function InterviewPractice() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const questionType = queryParams.get("questionType") || "Behavioural";
  // Get the answerType (Text/Video)
  const answerType = queryParams.get("answerType") || "Text"; 
  // Get answer time
  const timeLimit = parseInt(queryParams.get("answerTime"), 10) || 120; 

  const [recordedChunks, setRecordedChunks] = useState([]);
  // New state to hold the text answer
  const [textAnswer, setTextAnswer] = useState(""); 
  // State to hold duration
  const [textAnswerDuration, setTextAnswerDuration] = useState(0); 

  // Navigate to the summary page
  function goToSummary() {
    const duration = answerType === "Text" ? textAnswerDuration : timeLimit - recordedChunks.length;
    navigate("/summary", {
      state: {
        answer: textAnswer, 
        duration: duration,
        date: new Date().toLocaleDateString(),
        question: "Tell me about a challenging project you've worked on.",
      },
    });
  }

  // Handle submission for text answers
  const handleTextSubmit = (answer, duration) => {
    // Store the submitted answer in state
    setTextAnswer(answer); 
    // Store the duration in state
    setTextAnswerDuration(duration); 
    // No navigation here; just store the answer and freeze the text input.
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Interview Practice</h1>
      <QuestionComponent questionType={questionType} />
      <p className="lead">
        Prepare for your interviews with our customizable practice questions and
        recording features.
      </p>

      {/* Conditionally render the TextAnswerComponent or VideoRecordingComponent */}
      {answerType === "Text" ? (
        <TextAnswerComponent
          timeLimit={timeLimit}
          onSubmit={handleTextSubmit}
          // Pass goToSummary to the component for the "Next" button
          goToSummary={goToSummary} 
        />
      ) : (
        <VideoRecordingComponent
          timeLimit={timeLimit}
          setRecordedChunks={setRecordedChunks}
          recordedChunks={recordedChunks}
          goToSummary={goToSummary}
        />
      )}
    </div>
  );
}

export default InterviewPractice;
