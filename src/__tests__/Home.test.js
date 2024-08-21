import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home"; // Adjust this import path as needed
import InterviewSettings from "../pages/InterviewSettings"; // Adjust import path
import JobFinder from "../pages/JobFinder"; // Adjust import path

describe("Home component", () => {
  // Render the Home component with the given routes
  beforeEach(() => {
    render(
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interviewSettings" element={<InterviewSettings />} />
          <Route path="/jobFinder" element={<JobFinder />} />
        </Routes>
      </Router>
    );
  });

  //testing if our Brand Name is present properly
  test("Displays SMARTJ, Our Brand Name", () => {
    const brandName = screen.getByText(/SMARTJ/i);
    expect(brandName).toBeInTheDocument();
  });

  test("Renders without crashing", () => {
    // The component is already rendered, so nothing additional is needed here
  });

  test("Displays the Job Finder card with correct link", () => {
    const jobFinderCardTitle = screen.getByText(/Job Finder/i);
    expect(jobFinderCardTitle).toBeInTheDocument();

    const jobFinderCardLink = jobFinderCardTitle.closest("a");
    expect(jobFinderCardLink).toBeInTheDocument();

    if (jobFinderCardLink) {
      expect(jobFinderCardLink).toHaveAttribute("href", "/job-finder");
    } else {
      throw new Error("Job Finder card link not found");
    }

    const jobFinderCardImage = screen.getByAltText(/Job Finder/i);
    expect(jobFinderCardImage).toBeInTheDocument();
  });

  // Test navigation to Job Finder
  test("Navigates to Job Finder on button click", () => {
    const jobFinderCardLink = screen.getByText(/Job Finder/i).closest("a");
    expect(jobFinderCardLink).toBeInTheDocument();

    fireEvent.click(jobFinderCardLink);

    // Check if the URL is updated correctly
    expect(window.location.pathname).toBe("/job-finder");
  });
});
