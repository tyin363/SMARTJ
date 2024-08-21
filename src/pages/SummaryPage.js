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

    navigate('/interview-settings');

  };

  // Navigate to the home page
  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="container mt-5">
      {/* Main title for the summary page */}
      <h1 className="display-4 text-center mb-5">Interview Summary</h1>

      <div className="d-flex flex-column justify-content-center align-items-center">
        <img
          src="images/thumbsup.png"
          width="400"
          height="400"
          className="mb-4"
          alt="Thumbs Up"
          style={{ objectFit: 'contain' }}
        />
        <p className="lead text-center mb-3">
          Great job on your practice session! Keep practicing to improve your interview skills.
        </p>
        <div className="mt-2">
          <button className="btn btn-primary me-3" onClick={startNewInterview}>
            Start New Practice
          </button>
          <button className="btn btn-info" onClick={goHome}>
            Go Home
          </button>
        </div>

  
      </div>
    </div>
  );
};

export default SummaryPage;
