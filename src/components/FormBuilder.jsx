import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { saveAs } from "file-saver";
import Answer from "./Answer";
import QuestionList from "./QuestionList";
import './styles.css';

const FormBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [, setAnswers] = useState({});
   
  const addQuestion = () => {
    if (currentQuestion.trim() === "") return;
    setQuestions([
      ...questions,
      {
        text: currentQuestion,
        answers: [],
      },
    ]);
    setCurrentQuestion("");
  };

  useEffect(() => {
    const initialAnswers = {};
    questions.forEach((_, index) => {
      initialAnswers[index] = "";
    });
    setAnswers(initialAnswers);
  }, [questions]);

  const saveToJson = () => {
    const data = {
      questions: questions.map((question, index) => ({
        text: question.text,
        answers: question.answers.map((answer) => {
          const inputElement = document.querySelector(
            `input[name="respostas-${index}"][value="${answer}"]`
          );
          const type = inputElement ? inputElement.type : "unknown";
          return {
            type: type,
            value: answer,
            label: answer,
          };
        }),
      })),
    };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    saveAs(blob, "perguntas_e_respostas.json");
  };

  return (
    <div className="container">
      <h1 className="title">
        TEMPLATE PARA QUESTIONÁRIO RISCO SOCIOAMBIENTAL
      </h1>
      <QuestionList questions={questions} setQuestions={setQuestions} />
      <br />
      <Answer
        addQuestion={addQuestion}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
      />

      <div>
        <Button onClick={saveToJson} className="button">
          Salvar JSON
        </Button>
      </div>
    </div>
  );
};

 

export default FormBuilder;
