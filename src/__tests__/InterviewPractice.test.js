import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import InterviewPractice from "../pages/InterviewPractice";
import Summary from "../pages/SummaryPage";

// Mock the child components that are used in InterviewPractice
jest.mock("../components/QuestionComponent", () => () => (
  <div>Mock Question</div>
));
jest.mock("../components/VideoRecordingComponent", () => (props) => (
  <div>
    Mock VideoRecordingComponent
    <button onClick={props.goToSummary}>End Recording</button>
  </div>
));
jest.mock("../components/TextAnswerComponent", () => (props) => (
  <div>
    Mock TextAnswerComponent
    <button onClick={() => props.onSubmit("Sample answer", 60)}>
      Submit Answer
    </button>
    <button onClick={props.goToSummary}>Finish</button>
  </div>
));

describe("InterviewPractice", () => {
  const setup = (queryString) => {
    return render(
      <MemoryRouter initialEntries={[`/interview-practice${queryString}`]}>
        <Routes>
          <Route path="/interview-practice" element={<InterviewPractice />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test("renders the first question correctly", () => {
    setup("?questionType=Behavioural&answerType=Text&numQuestions=3");

    // Check if the first question is rendered
    expect(screen.getByText("Mock Question")).toBeInTheDocument();

    // Check if the TextAnswerComponent is rendered
    expect(screen.getByText("Mock TextAnswerComponent")).toBeInTheDocument();
  });

  test("navigates to the next question on 'Next Question' button click", () => {
    setup("?questionType=Behavioural&answerType=Text&numQuestions=3");

    // Click the "Next Question" button
    fireEvent.click(screen.getByText("Next Question"));

    // The next question should still show the Mock Question
    expect(screen.getByText("Mock Question")).toBeInTheDocument();
  });

  test("renders video recording component when answer type is 'Video'", () => {
    setup("?questionType=Technical&answerType=Video&numQuestions=1");

    // Check if the VideoRecordingComponent is rendered
    expect(
      screen.getByText("Mock VideoRecordingComponent")
    ).toBeInTheDocument();
  });
});
