import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SummaryPage = () => {
  // Hook to access the current location object, which contains state from the previous page
  const location = useLocation();

  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Retrieve interview data from location state or use default values if none is provided
  const interviewData = location.state || {
    question: "No question available",
    duration: 0,
    date: new Date().toLocaleDateString(),
  };

  // Navigate to the interview practice page
  const startNewInterview = () => {
    navigate("/interview-practice");
  };

  // Navigate to the home page
  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="container mt-5">
      {/* Main title for the summary page */}
      <h1 className="display-4 text-center mb-5">Interview Summary</h1>

      {/* Card displaying recent interview practice details */}
      <div className="card mb-4">
        <div className="card-header">
          <h2 className="h4 mb-0">Recent Interview Practice</h2>
        </div>
        <div className="card-body">
          <p>
            <strong>Date:</strong> {interviewData.date}
          </p>
          <p>
            <strong>Question:</strong> {interviewData.question}
          </p>
          <p>
            <strong>Duration:</strong> {interviewData.duration} seconds
          </p>
        </div>
      </div>

      {/* Card displaying practice statistics */}
      <div className="card mb-4">
        <div className="card-header">
          <h2 className="h4 mb-0">Practice Statistics</h2>
        </div>
        <div className="card-body">
          <p>Total Practice Sessions: 1</p>
          <p>Average Duration: {interviewData.duration} seconds</p>
          <p>Most Recent Practice: {interviewData.date}</p>
        </div>
      </div>

      {/* Section with buttons for user actions */}
      <div className="text-center mt-5">
        <p className="lead">
          Great job on your practice session! Keep practicing to improve your
          interview skills.
        </p>
        {/* Button to start a new practice session */}
        <button
          className="btn btn-primary mt-3 me-3"
          onClick={startNewInterview}
        >
          Start New Practice
        </button>
        {/* Button to navigate back to the home page */}
        <button className="btn btn-info mt-3" onClick={goHome}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default SummaryPage;
