import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //Summary page uses stored state from the previous page to display the interview data
  const interviewData = location.state || {
    question: "No question available",
    duration: 0,
    date: new Date().toLocaleDateString()
  };

  const startNewInterview = () => {
    navigate('/interview-practice');
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h1 className="display-4 text-center mb-5">Interview Summary</h1>
      {/* Recent Interview Practice Summary card to display data. */}
      <div className="card mb-4">
        <div className="card-header">
          <h2 className="h4 mb-0">Recent Interview Practice</h2>
        </div>
        <div className="card-body">
          <p><strong>Date:</strong> {interviewData.date}</p>
          <p><strong>Question:</strong> {interviewData.question}</p>
          <p><strong>Duration:</strong> {interviewData.duration} seconds</p>
        </div>
      </div>
      
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
      
      <div className="text-center mt-5">
        <p className="lead">
          Great job on your practice session! Keep practicing to improve your interview skills.
        </p>
        <button className="btn btn-primary mt-3 me-3" onClick={startNewInterview}>
          Start New Practice
        </button>
        <button className="btn btn-info mt-3" onClick={goHome}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default SummaryPage;