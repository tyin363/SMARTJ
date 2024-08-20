import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "jquery";
import "./index.css";

import Home from "./pages/Home";
import JobFinder from "./pages/JobFinder";
import ContactUs from "./pages/ContactUs";
import MyProfile from "./pages/MyProfile";
import InterviewPractice from "./pages/InterviewPractice";
import InterviewSettings from "./pages/InterviewSettings";
import "@fortawesome/fontawesome-free/css/all.min.css";
import SummaryPage from "./pages/SummaryPage";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
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
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
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

        <div className="flex-grow-1">
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

        <footer
          className="text-center text-white mt-auto"
          style={{ backgroundColor: "#67a9d2" }}
        >
          <div className="container p-4 pb-0">
            <section className="mb-4">
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-google"></i>
              </a>
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="https://github.com/SOFTENG310-Team4/SMARTJ"
                role="button"
              >
                <i className="fab fa-github"></i>
              </a>
            </section>
          </div>

          <div
            className="text-center p-3"
            style={{
              backgroundColor: "#c7e2fd",
              color: "black",
            }}
          >
            © 2024 Copyright:
            <a
              className="text-black"
              href="https://github.com/SOFTENG310-Team4/SMARTJ/"
            >
              SMARTJ.co.nz
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
