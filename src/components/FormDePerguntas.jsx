import React, { useState } from "react";
import Question from "./Question";
import Answer from "./Answer";
import QuestionInput from "./QuestionInput";

function FormDePerguntas() {
  // Renomeie o componente
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [showAnswer, setShowAnswer] = useState({});

  const handleInputChange = (event) => {
    setNewQuestion(event.target.value);
  };

  const addQuestion = () => {
    if (newQuestion.trim() !== "") {
      setQuestions([
        ...questions,
        { id: questions.length + 1, question: newQuestion, answer: "" },
      ]);
      setNewQuestion("");
    }
  };

  const handleAnswerClick = (id) => {
    setShowAnswer((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div style={styles.container}>
      {" "}
      <h1>Perguntas e Respostas</h1>
      <div>
        {questions.map((item) => (
          <div key={item.id}>
            <Question
              question={item.question}
              onAnswerClick={() => handleAnswerClick(item.id)}
            />
            <Answer answer={item.answer} />
          </div>
        ))}
        <QuestionInput
          value={newQuestion}
          onChange={handleInputChange}
          onAdd={addQuestion}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    // Estilo para centralizar o conteúdo
    display: "flex",
    flexDirection: "column", // Alinha os itens em coluna
    alignItems: "center", // Centraliza horizontalmente
    justifyContent: "center", // Centraliza verticalmente (opcional)
  },
};
export default FormDePerguntas;
