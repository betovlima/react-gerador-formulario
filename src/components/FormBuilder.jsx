import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import Answer from "./Answer";
import QuestionList from "./QuestionList";
import jsPDF from 'jspdf';


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
        nestedQuestions: question.nestedQuestions ? question.nestedQuestions.map(nestedQuestion => ({
          text: nestedQuestion.text,
          answers: nestedQuestion.answers.map((answer) => ({
            type: 'radio',
            value: answer,
            label: answer,
          }))
        })) : undefined
      })),
    };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    saveAs(blob, "perguntas_e_respostas.json");
  };

  const generatePdf = () => {
    const doc = new jsPDF();
  
    doc.setFontSize(20);
    doc.text("Questionário de Risco Socioambiental", 20, 20);
  
    let y = 40;
    questions.forEach((question, index) => {
      doc.setFontSize(16);
      doc.text(`${index + 1}. ${question.text}`, 20, y);
      y += 10;
  
      question.answers.forEach((answer) => {
        doc.setFontSize(12);
        doc.text(`       ( ) ${answer}`, 30, y);
        y += 10;
      });
  
      if (question.nestedQuestions) {
        question.nestedQuestions.forEach((nestedQuestion, nestedIndex) => {
          doc.setFontSize(14);
          doc.text(`  ${nestedIndex + 1}. ${nestedQuestion.text}`, 30, y);
          y += 10;
  
          nestedQuestion.answers.forEach((answer) => {
            doc.setFontSize(12);
            doc.text(`    ( ) ${answer}`, 40, y);
            y += 10;
          });
        });
      }
  
      y += 10;
    });
  
    doc.save("questionario.pdf");
  };

  return (
    <div className="container">
      <h1 className="title">
        TEMPLATE PARA QUESTIONÁRIO
      </h1>
      <QuestionList questions={questions} setQuestions={setQuestions} />
      <br />
      <Answer
        addQuestion={addQuestion}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
      />

      <div>
        <button onClick={saveToJson} className="button">
          Salvar JSON
        </button>
      </div>
      <div>
        <button onClick={generatePdf} className="button">
          Gerar PDF
        </button>
      </div>
    </div>
  );
};

 

export default FormBuilder;
