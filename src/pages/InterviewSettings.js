import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../InterviewSettings.css'; // Import the CSS file

import InterviewPractice from "./InterviewPractice";

function InterviewSettings() {
    const [numQuestions, setNumQuestions] = useState(3); // Default number of questions
    const [questionType, setQuestionType] = useState("Experiences"); // Default question type
    const [readingTime, setReadingTime] = useState(40); // Default reading time in seconds
    const [answerTime, setAnswerTime] = useState(120); // Default answer time in seconds
    const [answerType, setAnswerType] = useState("Text"); // Default answer type

    const questionTypes = ["Technical", "Experiences"];
    const answerTypes = ["Text", "Voice", "Video"];

    const handleArrowClick = (setter, value, delta) => {
        setter(value + delta);
    };

    const handleTypeChange = (currentType, types, setter, delta) => {
        const currentIndex = types.indexOf(currentType);
        const nextIndex = (currentIndex + delta + types.length) % types.length;
        setter(types[nextIndex]);
    };

    return (
        <div className="container text-center mt-5">
            <h1 className="display-4">Interview Settings</h1>

            <div className="settings mt-4">
                <div className="setting">
                    <h4>Number of Questions: {numQuestions}</h4>
                    <button onClick={() => handleArrowClick(setNumQuestions, numQuestions, -1)} disabled={numQuestions <= 1}>
                        &lt;
                    </button>
                    <button onClick={() => handleArrowClick(setNumQuestions, numQuestions, 1)}>
                        &gt;
                    </button>
                </div>

                <div className="setting">
                    <h4>Question Type: {questionType}</h4>
                    <button onClick={() => handleTypeChange(questionType, questionTypes, setQuestionType, -1)}>
                        &lt;
                    </button>
                    <button onClick={() => handleTypeChange(questionType, questionTypes, setQuestionType, 1)}>
                        &gt;
                    </button>
                </div>

                <div className="setting">
                    <h4>Reading Time: {readingTime} seconds</h4>
                    <button onClick={() => handleArrowClick(setReadingTime, readingTime, -5)} disabled={readingTime <= 5}>
                        &lt;
                    </button>
                    <button onClick={() => handleArrowClick(setReadingTime, readingTime, 5)}>
                        &gt;
                    </button>
                </div>

                <div className="setting">
                    <h4>Answer Time: {answerTime} seconds</h4>
                    <button onClick={() => handleArrowClick(setAnswerTime, answerTime, -5)} disabled={answerTime <= 5}>
                        &lt;
                    </button>
                    <button onClick={() => handleArrowClick(setAnswerTime, answerTime, 5)}>
                        &gt;
                    </button>
                </div>

                <div className="setting">
                    <h4>Answer Type: {answerType}</h4>
                    <button onClick={() => handleTypeChange(answerType, answerTypes, setAnswerType, -1)}>
                        &lt;
                    </button>
                    <button onClick={() => handleTypeChange(answerType, answerTypes, setAnswerType, 1)}>
                        &gt;
                    </button>
                </div>

                <button className="btn btn-primary mt-4">
                    <Link className="nav-link" to="/interview-practice">
                        Start Interview
                    </Link>
                </button>
            </div>

            <Routes>
                <Route path="/interview-practice" element={<InterviewPractice />} />
            </Routes>
        </div>
    );
}

export default InterviewSettings;
