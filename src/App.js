import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // Import global styles

import Home from './pages/Home';
import JobFinder from './pages/JobFinder';
import ContactUs from './pages/ContactUs';
import MyProfile from './pages/MyProfile';
import InterviewPractice from './pages/InterviewPractice';
import InterviewSettings from './pages/InterviewSettings';
import SummaryPage from "./pages/SummaryPage";  


function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            <img
              src="images/logo.png"
              alt="Search Icon"
              width="50"
              height="50"
            />
            SMARTJ
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/interview-settings">
                  Interview Practice
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/job-finder">
                  Job Finder
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact-us">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-profile">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview-settings" element={<InterviewSettings />} />
          <Route path="/interview-practice" element={<InterviewPractice />} />
          <Route path="/job-finder" element={<JobFinder />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
