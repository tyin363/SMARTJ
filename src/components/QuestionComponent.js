// src/components/QuestionComponent.js
import React, { useState, useEffect } from "react";

// Fetch questions from a JSON file based on the provided type
const fetchQuestions = async (type) => {
  // Construct the endpoint URL dynamically based on the question type
  const response = await fetch(`/question-bank-${type}.json`);
  const questions = await response.json();
  return questions;
};

// QuestionComponent displays a random question based on the questionType prop
const QuestionComponent = ({ questionType }) => {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    // Function to fetch and set a random question
    const getRandomQuestion = async () => {
      // Fetch questions from the endpoint based on questionType
      const questions = await fetchQuestions(questionType);
      // Select a random question from the list
      const randomIndex = Math.floor(Math.random() * questions.length);
      setQuestion(questions[randomIndex].question);
    };

    // Fetch a random question whenever questionType changes
    getRandomQuestion();
  }, [questionType]); // Dependency array ensures effect runs when questionType changes

  return (
    <div className="question-container">
      <div className="question">
        <h2>Interview Question:</h2>
        <p>{question}</p>
      </div>
      <div className="answer">
        {/* Render the answer part based on settings */}
      </div>
    </div>
  );
};

export default QuestionComponent;
