import { RadioGroup } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import React, { useEffect, useState } from "react";
import QuestionTopButtons from "./QuestionTopButtons";

import "./styles.css";

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

  useEffect(() => {
    const initialAnswers = {};
    questions.forEach((_, index) => {
      initialAnswers[index] = "";
    });
    setAnswers(initialAnswers);
  }, [questions]);

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
    <div>
      {questions.map((question, index) => (
        <div
          key={index}
          className={
            index === movedIndex
              ? {
                  ..."question",
                  border: "4px solid #4CAF50",
                  animation: "blink 1.5s ease",
                }
              : "question"
          }
        >
          <div
            style={{
              display: "flex",
              marginBottom: "10px",
              justifyContent: "flex-end",
            }}
          >
            <QuestionTopButtons
              index={index}
              editingIndex={editingIndex}
              questions={questions}
              setQuestions={setQuestions}
              setMovedIndex={setMovedIndex}
              setEditingIndex={setEditingIndex}
            />
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
              className="input"
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
          {question.nestedQuestions && question.nestedQuestions.length > 0 && (
            <div style={{ marginLeft: "20px" }}>
              {question.nestedQuestions.map((nestedQuestion, nestedIndex) => (
                <div key={nestedIndex} className="question">
                  {/* Renderiza a sub-pergunta */}
                  <h3>{nestedQuestion.text}</h3>

                  {/* Renderiza as respostas da sub-pergunta, se houver */}
                  {/*... */}
                </div>
              ))}
            </div>
          )}
          {
            <div>
              <button onClick={() => addAnswer(index)} className="button">
                Adicionar Resposta
              </button>
              <button
                onClick={() => handleNestedOpen(index)}
                className="button"
              >
                Aninhar Pergunta
              </button>
            </div>
          }
        </div>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="title">Selecione a resposta</DialogTitle>
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

export default QuestionList;
