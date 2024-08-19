import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuestionComponent from "../components/QuestionComponent";
import VideoRecordingComponent from "../components/VideoRecordingComponent";
import TextAnswerComponent from "../components/TextAnswerComponent"; 
import "../InterviewPractice.css";

function InterviewPractice() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const questionType = queryParams.get("questionType") || "Behavioural";
  const answerType = queryParams.get("answerType") || "Text"; 
  const [count, setCount] = useState(0);
  const numQuestions = parseInt(queryParams.get("numQuestions"), 10) || 3;
  const timeLimit = parseInt(queryParams.get("answerTime"), 10) || 120; 
  const readingTime = parseInt(queryParams.get("readingTime"), 10) || 40;

  const [recordedChunks, setRecordedChunks] = useState([]);
  const [textAnswer, setTextAnswer] = useState(""); 
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
  };

  // Increment the question count to trigger a re-render
  const increment = () => {
    if (count < numQuestions - 1) {
      setCount(count + 1); // Increment the count to trigger re-render
    } else {
      // Optionally, you can navigate to the summary when the last question is completed
      goToSummary();
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Interview Practice</h1>
      <p className="lead">
        Prepare for your interviews with our customizable practice questions and
        recording features.
      </p>

      {/* Wrap the QuestionComponent in a div with a key to force re-rendering */}
      <QuestionComponent 
  key={count}  // Ensure 'count' changes with each question
  questionType={questionType} 
/>


      {/* Conditionally render the TextAnswerComponent or VideoRecordingComponent */}
      {answerType === "Text" ? (
        <TextAnswerComponent
          key={count} // Unique key to trigger re-render
          readingTime={readingTime}
          timeLimit={timeLimit}
          onSubmit={handleTextSubmit}
          goToSummary={goToSummary} 
        />
      ) : (
        <VideoRecordingComponent
          key={count} // Unique key to trigger re-render
          readingTime={readingTime}
          timeLimit={timeLimit}
          setRecordedChunks={setRecordedChunks}
          recordedChunks={recordedChunks}
          goToSummary={goToSummary}
        />
      )}

      <div className="button-container mt-4">
        {count < numQuestions - 1 ? (
          <button onClick={increment} className="btn btn-primary">
            Next Question
          </button>
        ) : (
          <button onClick={goToSummary} className="btn btn-success">
            Finish
          </button>
        )}
      </div>
    </div>
  );
}

export default InterviewPractice;
