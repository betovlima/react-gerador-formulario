import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
const styles = {
  question: {
    padding: "20px",
    margin: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "8px 10px",
    fontSize: "14px",
    backgroundColor: "#34a853",
    color: "#FFF",
    border: "none",
    minWidth: "100px",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
  },
};

const Question = ({
  question,
  index,
  questions,
  setQuestions,
  moveQuestionUp,
  moveQuestionDown,
  deleteQuestion,
  handleNestedOpen,
}) => {
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [answeringIndex, setAnsweringIndex] = React.useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [movedIndex, setMovedIndex] = useState(null);

  const addAnswer = (index) => {
    handleClickOpen(index);
  };

  const handleClickOpen = (index) => {
    setOpen(true);
    setAnsweringIndex(index);
  };

  const handleEditQuestion = () => {
    setEditing(!editing);
  };

  return (
    <div
      style={
        index === movedIndex
          ? {
              ...styles.question,
              border: "4px solid #4CAF50",
              animation: "blink 1.5s ease",
            }
          : styles.question
      }
    >
      <div
        style={{
          display: "flex",
          marginBottom: "10px",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={() => moveQuestionUp(index)} style={styles.button}>
          Mover para cima
        </Button>
        <Button onClick={() => moveQuestionDown(index)} style={styles.button}>
          Mover para baixo
        </Button>
        <Button onClick={handleEditQuestion} style={styles.button}>
          {editing ? "Salvar" : "Editar"}
        </Button>
        <Button onClick={() => deleteQuestion(index)} style={styles.button}>
          Excluir
        </Button>
      </div>
      {editing ? (
        <input
          type="text"
          value={question.text}
          onChange={(e) => {
            const newQuestions = [...questions];
            newQuestions[index].text = e.target.value;
            setQuestions(newQuestions);
          }}
          style={styles.input}
        />
      ) : (
        <h3>
          {index + 1}. {question.text}
        </h3>
      )}
      {question.answers.length > 0 && (
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="answers"
            name={`answers-${index}`}
            value={question.selectedAnswers[0] || ""}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].selectedAnswers = [e.target.value];
              setQuestions(newQuestions);
            }}
          >
            {question.answers.map((answer, answerIndex) => (
              <FormControlLabel
                key={answerIndex}
                value={answer}
                control={<Radio />}
                label={answer}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
      <div>
        <Button onClick={() => addAnswer(index)} style={styles.button}>
          Adicionar Resposta
        </Button>
        <Button onClick={() => handleNestedOpen(index)} style={styles.button}>
          Aninhar Pergunta
        </Button>
      </div>

      {/* Renderiza as sub-perguntas, se existirem */}
      {question.nestedQuestions && question.nestedQuestions.length > 0 && (
        <div style={{ marginLeft: "20px" }}>
          {question.nestedQuestions.map((nestedQuestion, nestedIndex) => (
            <Question
              key={nestedIndex}
              question={nestedQuestion}
              index={nestedIndex}
              questions={question.nestedQuestions} // Passa as sub-perguntas como `questions`
              setQuestions={(newNestedQuestions) => {
                // Função para atualizar as sub-perguntas
                const newQuestions = [...questions];
                newQuestions[index].nestedQuestions = newNestedQuestions;
                setQuestions(newQuestions);
              }}
              moveQuestionUp={moveQuestionUp}
              moveQuestionDown={moveQuestionDown}
              deleteQuestion={deleteQuestion}
              handleNestedOpen={handleNestedOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Question;
