import { React } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

//Testing if App test renders without crashing
describe("App component", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("SMARTJ brand name is present and correct", () => {
    const brandLinks = screen.getAllByText(/SMARTJ/i);
    expect(brandLinks.length).toBeGreaterThan(0);

    const firstBrandLink = brandLinks[0];
    expect(firstBrandLink.closest("a")).toHaveAttribute("href", "/");
  });

  test("navigation links are present and correct", () => {
    const navLinks = [
      "Home",
      "Interview Practice",
      "Job Finder",
      "Contact Us",
      "My Profile",
    ];

    navLinks.forEach((linkText) => {
      const matchingElements = screen.getAllByText(linkText);
      expect(matchingElements.length).toBeGreaterThan(0);
      matchingElements.forEach((element) => {
        // Verify that the element is within a navigation link
        expect(element.closest("a")).toBeInTheDocument();
      });
    });
  });
});

//Testing if dummy test runs
test("dummy test that always passes", () => {
  expect(1 + 1).toBe(2);
});
