import React, { useState, useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { saveAs } from "file-saver";

const FormBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [, setCurrentAnswerOptions] = useState("");
  const [, setAnswers] = useState({});
  const [movedIndex, setMovedIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState("");
  const [answeringIndex, setAnsweringIndex] = React.useState(null);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedAnswer([...selectedAnswer, value]);
    } else {
      setSelectedAnswer(selectedAnswer.filter((item) => item !== value));
    }
  };

  const handleClickOpen = (index) => {
    setOpen(true);
    setAnsweringIndex(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAnswer = () => {
    const newQuestions = [...questions];
    newQuestions[answeringIndex].answers = selectedAnswer;
    setQuestions(newQuestions);
    setOpen(false);
    setSelectedAnswer([]);
  };

  const addAnswer = (index) => {
    handleClickOpen(index);
  };

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
        <button onClick={() => addAnswer(index)} style={styles.button}>
          Aninhar Pergunta
        </button>
      </div>
    );
  };

  const saveToJson = () => {
    const data = {
      questions: questions.map((question, index) => ({
        text: question.text,
        answers: question.answers.map((answer, answerIndex) => {
          const inputElement = document.querySelector(`input[name="respostas-${index}"][value="${answer}"]`); // Seleciona o input do radio button
          const type = inputElement ? inputElement.type : 'unknown'; // Obtém o tipo do input ou define como 'unknown' se não encontrar
          return {
            type: type,
            value: answer,
            label: answer,
          }
        })
      }))
    };
    const jsonString = JSON.stringify(data, null, 2); // Formata o JSON com 2 espaços de indentação
    const blob = new Blob([jsonString], { type: "application/json" });
    saveAs(blob, "perguntas_e_respostas.json");
  };

  return (
    <div style={styles.container}>
    
      <h1 style={styles.title}>
        TEMPLATE PARA QUESTIONÁRIO RISCO SOCIOAMBIENTAL
      </h1>
      <div style={styles.form}>
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
              <h3>
                {index + 1}. {question.text}
                <br />
                {question.answers.length > 0 && (
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="respostas"
                      name={`respostas-${index}`}
                      value={question.selectedAnswers}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].selectedAnswers = e.target.value;
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
              </h3>
            )}
            {renderQuestion(question, index)}
          </div>
        ))}
      </div>
      <div style={styles.formControlsBox}>
        <textarea
          type="text"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          placeholder="Digite a pergunta"
          style={styles.input}
        />

        <button onClick={addQuestion} style={styles.button}>
          Adicionar
        </button>
      </div>
      <div style={styles.container}>
        <Button onClick={saveToJson} style={styles.button}>
          Salvar JSON
        </Button>
      </div>
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
    </div>
  );
};

const styles = {
  formControlsBox: {
    border: "1px solid #ccc",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "5px",
    display: "flex",
    maxWidth: "100%",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#136f40",
  },
  formControls: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    width: "100%",
    flex: 1,
    maxWidth: "300px",
  },
  select: {
    padding: "8px",
    fontSize: "16px",
    maxWidth: "150px",
  },
  buttonWithMargin: {
    padding: "8px 10px", // Padding horizontal diminuído
    fontSize: "16px",
    backgroundColor: "#34a853",
    color: "#FFF",
    border: "none",
    borderRadius: "4px",
    minWidth: "100px",
    cursor: "pointer",
    marginRight: "20px", // Espaçamento aumentado
    "&:hover": {
      backgroundColor: "#45a049", // Verde claro no hover
    },
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
  form: {
    marginTop: "20px",
  },
  question: {
    marginBottom: "20px",
    transition: "transform 0.3s ease",
    border: "1px solid #ccc",
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "#f7f9fb",
    display: "flex",
    flexDirection: "column",
  },
  multipleChoice: {
    display: "flex",
    flexDirection: "column",
  },
  dropdown: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dropdownLabel: {
    marginBottom: "5px",
  },
  "@keyframes blink": {
    "0%, 100%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0.5,
    },
  },
};

export default FormBuilder;
