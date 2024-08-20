import React, { useState, useEffect } from "react";

const fetchQuestions = async (type) => {
  const response = await fetch(`/question-bank-${type}.json`); // Adjust the endpoint based on type
  const questions = await response.json();
  return questions;
};

const QuestionComponent = ({ questionType }) => {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const getRandomQuestion = async () => {
      const questions = await fetchQuestions(questionType);
      if (questions.length > 0) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        setQuestion(questions[randomIndex].question);
      }
    };

    getRandomQuestion();
  }, [questionType]);

  return (
    <div className="question-container">
      <div className="question">
        <h2>{question}</h2>
      </div>
      <div className="answer">
        {/* Render the answer part based on settings */}
      </div>
    </div>
  );
};

export default QuestionComponent;
