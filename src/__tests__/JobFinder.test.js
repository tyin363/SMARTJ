import React from "react";
import { render, screen } from "@testing-library/react";
import JobFinder from "../pages/JobFinder"; // Adjust the import path if necessary

describe("JobFinder component", () => {
  beforeEach(() => {
    render(<JobFinder />);
  });

  test("renders main title correctly", () => {
    const mainTitle = screen.getByText(/Job Finder/i);
    expect(mainTitle).toBeInTheDocument();
  });

  test("renders subtitle correctly", () => {
    const subtitle = screen.getByText(
      /Curated links to tech internship listings for you!/i
    );
    expect(subtitle).toBeInTheDocument();
  });

  test("renders Prosple internship link with correct image", () => {
    const prospleLink = screen.getByAltText(/Prosple/i).closest("a");
    expect(prospleLink).toHaveAttribute(
      "href",
      "https://nz.prosple.com/search-jobs?content=internships-new-zealand&study_fields=502%2C502%7C510&locations=796&defaults_applied=1&start=0&opportunity_types=2"
    );
  });

  test("renders Summer of Tech internship link with correct image", () => {
    const summerOfTechLink = screen
      .getByAltText(/Summer of Tech/i)
      .closest("a");
    expect(summerOfTechLink).toHaveAttribute(
      "href",
      "https://app.summeroftech.co.nz/jobs"
    );
  });

  test("renders Seek internship link with correct image", () => {
    const seekLink = screen.getByAltText(/Seek/i).closest("a");
    expect(seekLink).toHaveAttribute(
      "href",
      "https://www.seek.co.nz/jobs-in-information-communication-technology/in-All-Auckland"
    );
  });

  test("renders Indeed internship link with correct image", () => {
    const indeedLink = screen.getByAltText(/Indeed/i).closest("a");
    expect(indeedLink).toHaveAttribute(
      "href",
      "https://nz.indeed.com/jobs?q=software+%2C+intern&l=New+Zealand&from=searchOnDesktopSerp&vjk=78107bef7ff5927f"
    );
  });

  test("renders Glassdoor internship link with correct image", () => {
    const glassdoorLink = screen.getByAltText(/Glassdoor/i).closest("a");
    expect(glassdoorLink).toHaveAttribute(
      "href",
      "https://www.glassdoor.co.nz/Job/new-zealand-software-intern-jobs-SRCH_IL.0,11_IN186_KO12,27.htm"
    );
  });

  test("renders LinkedIn internship link with correct image", () => {
    const linkedinLink = screen.getByAltText(/LinkedIn/i).closest("a");
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/jobs/search/?currentJobId=3935175062&geoId=105490917&keywords=software%20internship&origin=JOB_SEARCH_PAGE_SEARCH_BUTTON&originalSubdomain=nz&refresh=true"
    );
  });
});
