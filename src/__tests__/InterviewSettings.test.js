import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import InterviewSettings from "../pages/InterviewSettings";

describe("InterviewSettings", () => {
  test("renders Interview Settings page correctly", () => {
    render(
      <MemoryRouter>
        <InterviewSettings />
      </MemoryRouter>
    );

    // Check that the main title is rendered
    expect(screen.getByText("Interview Settings")).toBeInTheDocument();

    // Check that default values are rendered
    expect(screen.getByText("Number of Questions: 3")).toBeInTheDocument();
    expect(screen.getByText("Question Type: Behavioural")).toBeInTheDocument();
    expect(screen.getByText("Reading Time: 40 seconds")).toBeInTheDocument();
    expect(screen.getByText("Answer Time: 120 seconds")).toBeInTheDocument();
    expect(screen.getByText("Answer Type: Text")).toBeInTheDocument();
  });

  test("increments and decrements number of questions correctly", () => {
    render(
      <MemoryRouter>
        <InterviewSettings />
      </MemoryRouter>
    );

    const decreaseButton = screen.getAllByText("<")[0];
    const increaseButton = screen.getAllByText(">")[0];

    // Decrease number of questions
    fireEvent.click(decreaseButton);
    expect(screen.getByText("Number of Questions: 2")).toBeInTheDocument();

    // Increase number of questions
    fireEvent.click(increaseButton);
    expect(screen.getByText("Number of Questions: 3")).toBeInTheDocument();
    fireEvent.click(increaseButton);
    expect(screen.getByText("Number of Questions: 4")).toBeInTheDocument();
  });

  test("changes question type correctly", () => {
    render(
      <MemoryRouter>
        <InterviewSettings />
      </MemoryRouter>
    );

    const decreaseButton = screen.getAllByText("<")[1];
    const increaseButton = screen.getAllByText(">")[1];

    // Change question type to "Technical"
    fireEvent.click(decreaseButton);
    expect(screen.getByText("Question Type: Technical")).toBeInTheDocument();

    // Change back to "Behavioural"
    fireEvent.click(increaseButton);
    expect(screen.getByText("Question Type: Behavioural")).toBeInTheDocument();
  });

  test("increments and decrements reading time correctly", () => {
    render(
      <MemoryRouter>
        <InterviewSettings />
      </MemoryRouter>
    );

    const decreaseButton = screen.getAllByText("<")[2];
    const increaseButton = screen.getAllByText(">")[2];

    // Decrease reading time
    fireEvent.click(decreaseButton);
    expect(screen.getByText("Reading Time: 30 seconds")).toBeInTheDocument();

    // Increase reading time
    fireEvent.click(increaseButton);
    expect(screen.getByText("Reading Time: 40 seconds")).toBeInTheDocument();
    fireEvent.click(increaseButton);
    expect(screen.getByText("Reading Time: 50 seconds")).toBeInTheDocument();
  });

  test("increments and decrements answer time correctly", () => {
    render(
      <MemoryRouter>
        <InterviewSettings />
      </MemoryRouter>
    );

    const decreaseButton = screen.getAllByText("<")[3];
    const increaseButton = screen.getAllByText(">")[3];

    // Decrease answer time
    fireEvent.click(decreaseButton);
    expect(screen.getByText("Answer Time: 110 seconds")).toBeInTheDocument();

    // Increase answer time
    fireEvent.click(increaseButton);
    expect(screen.getByText("Answer Time: 120 seconds")).toBeInTheDocument();
    fireEvent.click(increaseButton);
    expect(screen.getByText("Answer Time: 130 seconds")).toBeInTheDocument();
  });

  test("changes answer type correctly", () => {
    render(
      <MemoryRouter>
        <InterviewSettings />
      </MemoryRouter>
    );

    const decreaseButton = screen.getAllByText("<")[4];
    const increaseButton = screen.getAllByText(">")[4];

    // Change answer type to "Video"
    fireEvent.click(decreaseButton);
    expect(screen.getByText("Answer Type: Video")).toBeInTheDocument();

    // Change back to "Text"
    fireEvent.click(increaseButton);
    expect(screen.getByText("Answer Type: Text")).toBeInTheDocument();
  });

  test("start interview button links correctly", () => {
    render(
      <MemoryRouter>
        <InterviewSettings />
      </MemoryRouter>
    );

    const startButton = screen.getByText("Start Interview");
    expect(startButton.closest("a")).toHaveAttribute(
      "href",
      "/interview-practice?questionType=Behavioural&numQuestions=3&readingTime=40&answerTime=120&answerType=Text"
    );
  });
});
