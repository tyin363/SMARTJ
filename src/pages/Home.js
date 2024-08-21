import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="container text-center mt-5">
      {/* Main heading for the homepage with logo */}
      <h1 className="display-4">
        <img src="images/logo.png" alt="Search Icon" width="50" height="50" />
        SMARTJ
      </h1>

      {/* Introduction paragraph explaining the purpose of the application */}
      <p className="lead">
        We empower tech job seekers by offering interactive interview practice
        sessions with customizable questions, recording features, and feedback
        for improvement. We also streamline job searching by providing curated
        links to tech job listings, saving time and enhancing your job search
        experience.
      </p>

      {/* Container for the feature cards */}
      <div className="row mt-5">
        {/* Card for Interview Practice */}
        <div className="col-md-6">
          <div className="card mb-4 shadow-sm">
            <Link
              to="/interview-settings"
              className="text-decoration-none text-dark d-block"
            >
              {/* Image and title for Interview Practice feature */}
              <img
                src="images/interview_practice.png"
                width="200"
                height="400"
                className="card-img-top"
                alt="Interview Practice"
              />
              <div className="card-body">
                <h5 className="card-title">Interview Practice</h5>
              </div>
            </Link>
          </div>
        </div>

        {/* Card for Job Finder */}
        <div className="col-md-6">
          <div className="card mb-4 shadow-sm">
            <Link
              to="/job-finder"
              className="text-decoration-none text-dark d-block"
            >
              {/* Image and title for Job Finder feature */}
              <img
                src="images/job_finder.png"
                width="200"
                height="400"
                className="card-img-top"
                alt="Job Finder"
              />
              <div className="card-body">
                <h5 className="card-title">Job Finder</h5>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
