import React, { useState, useEffect } from "react";
import Question from "./Question";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

const QuestionList = ({ questions, setQuestions }) => {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [, setAnswers] = useState({});
  const [movedIndex, setMovedIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState("");
  const [answeringIndex, setAnsweringIndex] = React.useState(null);

  const [nestedOpen, setNestedOpen] = React.useState(false);
  const [nestedQuestion, setNestedQuestion] = React.useState("");
  const [nestingIndex, setNestingIndex] = React.useState(null);

  const handleNestedOpen = (index) => {
    setNestedOpen(true);
    setNestingIndex(index);
  };

  const handleNestedClose = () => {
    setNestedOpen(false);
    setNestedQuestion(""); // Limpa o texto da sub-pergunta
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

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedAnswer([...selectedAnswer, value]);
    } else {
      setSelectedAnswer(selectedAnswer.filter((item) => item !== value));
    }
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
  const handleClickOpen = (index) => {
    setOpen(true);
    setAnsweringIndex(index);
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
        <button onClick={() => handleNestedOpen(index)} style={styles.button}>
          Aninhar Pergunta
        </button>
      </div>
    );
  };

  return (
    <div style={styles.form}>
      {questions.map((question, index) => (
        <Question
          key={index}
          question={question}
          index={index}
          questions={questions}
          setQuestions={setQuestions}
          moveQuestionUp={moveQuestionUp}
          moveQuestionDown={moveQuestionDown}
          deleteQuestion={deleteQuestion}
          handleNestedOpen={editQuestion}
        />
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
    </div>
  );
};

const styles = {
  form: {
    marginTop: "20px",
  },
};
export default QuestionList;
