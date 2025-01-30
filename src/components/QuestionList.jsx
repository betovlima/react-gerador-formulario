import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import DialogContentText from "@mui/material/DialogContentText";
import Question from "./Question";

const QuestionList = ({ questions, setQuestions }) => {
  const [nestedOpen, setNestedOpen] = React.useState(false);
  const [nestedQuestion, setNestedQuestion] = React.useState("");
  const [movedIndex, setMovedIndex] = useState(null);
  const [nestingIndex, setNestingIndex] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [answeringIndex, setAnsweringIndex] = React.useState(null);
  const [selectedAnswer, setSelectedAnswer] = React.useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [, setAnswers] = useState({});

  const handleNestedOpen = (index) => {
    setNestedOpen(true);
    setNestingIndex(index);
  };

  const addAnswer = (index) => {
    handleClickOpen(index);
  };

  const handleClickOpen = (index) => {
    setOpen(true);
    setAnsweringIndex(index);
  };

  const moveQuestionUp = (index) => {
    if (index <= 0) return;
    const newQuestions = [...questions];
    const temp = newQuestions[index];
    newQuestions[index] = newQuestions[index - 1];
    newQuestions[index - 1] = temp;
    setQuestions(newQuestions);
    setMovedIndex(index - 1);
    setTimeout(() => setMovedIndex(null), 500);
  };

  const moveQuestionDown = (index) => {
    if (index >= questions.length - 1) return;
    const newQuestions = [...questions];
    const temp = newQuestions[index];
    newQuestions[index] = newQuestions[index + 1];
    newQuestions[index + 1] = temp;
    setQuestions(newQuestions);
    setMovedIndex(index + 1);
    setTimeout(() => setMovedIndex(null), 500);
  };

  const deleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const editQuestion = (index) => {
    if (editingIndex === index) {
      setEditingIndex(null);
    } else {
      setEditingIndex(index);
    }
  };

  useEffect(() => {
    const initialAnswers = {};
    questions.forEach((_, index) => {
      initialAnswers[index] = "";
    });
    setAnswers(initialAnswers);
  }, [questions]);

  const renderQuestion = (question, index) => {
    return (
      <div key={index}>
        <button onClick={() => addAnswer(index)} style={styles.button}>
          Adicionar Resposta
        </button>
        <button onClick={() => handleNestedOpen(index)} style={styles.button}>
          Aninhar Pergunta
        </button>
      </div>
    );
  };

  const handleAnswer = () => {
    const newQuestions = [...questions];
    newQuestions[answeringIndex].answers = selectedAnswer;
    setQuestions(newQuestions);
    setOpen(false);
    setSelectedAnswer([]);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedAnswer([...selectedAnswer, value]);
    } else {
      setSelectedAnswer(selectedAnswer.filter((item) => item !== value));
    }
  };

  const handleNestedClose = () => {
    setNestedOpen(false);
    setNestedQuestion("");
  };

  const addNestedQuestion = () => {
    if (nestedQuestion.trim() === "") return;

    const newQuestions = [...questions];
    if (!newQuestions[nestingIndex].nestedQuestions) {
      newQuestions[nestingIndex].nestedQuestions = [];
    }
    newQuestions[nestingIndex].nestedQuestions.push({
      text: nestedQuestion,
      answers: [],
      selectedAnswers: [],
    });
    setQuestions(newQuestions);
    setNestedOpen(false);
    setNestedQuestion("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={styles.container}>
      {questions.map((question, index) => (
        <div
          key={index}
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
            <button
              onClick={() => moveQuestionUp(index)}
              style={styles.buttonWithMargin}
            >
              Mover para cima
            </button>
            <button
              onClick={() => moveQuestionDown(index)}
              style={styles.buttonWithMargin}
            >
              Mover para baixo
            </button>
            <button
              onClick={() => editQuestion(index)}
              style={styles.buttonWithMargin}
            >
              {editingIndex === index ? "Salvar" : "Editar"}
            </button>
            <button
              onClick={() => deleteQuestion(index)}
              style={styles.buttonWithMargin}
            >
              Excluir
            </button>
          </div>
          {editingIndex === index ? (
            <input
              type="text"
              value={questions[index].text}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].text = e.target.value;
                setQuestions(newQuestions);
              }}
              style={styles.input}
            />
          ) : (
            <Question
              index={index}
              question={question}
              setQuestions={setQuestions}
            />
          )}
          {renderQuestion(question, index)}
        </div>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Selecione a resposta</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormControlLabel
              control={<Checkbox />}
              label="Sim"
              value="Sim"
              onChange={(e) => handleCheckboxChange(e)}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Não"
              value="Não"
              onChange={(e) => handleCheckboxChange(e)}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Não se aplica"
              value="Não se aplica"
              onChange={(e) => handleCheckboxChange(e)}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAnswer}>Adicionar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={nestedOpen} onClose={handleNestedClose}>
        <DialogTitle>Aninhar Pergunta</DialogTitle>
        <DialogContent
          style={{ width: "600px", maxWidth: "80%", padding: "20px" }}
        >
          <DialogContentText>Digite a sub-pergunta:</DialogContentText>
          <textarea
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            width="450px"
            heigth="400px"
            variant="standard"
            value={nestedQuestion}
            style={{ width: "465px", height: "147px" }}
            onChange={(e) => setNestedQuestion(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNestedClose}>Cancelar</Button>
          <Button onClick={addNestedQuestion}>Adicionar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
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
  buttonWithMargin: {
    padding: "8px 10px",
    fontSize: "16px",
    backgroundColor: "#34a853",
    color: "#FFF",
    border: "none",
    borderRadius: "4px",
    minWidth: "100px",
    cursor: "pointer",
    marginRight: "20px",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  },
};
export default QuestionList;
