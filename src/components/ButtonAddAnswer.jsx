import React from "react";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./styles.css";

function ButtonAddAnswer({ questions, index, setQuestions }) {
  const [open, setOpen] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState("");
  const [answeringIndex, setAnsweringIndex] = React.useState(null);
  const addAnswer = (index) => {
    handleClickOpen(index);
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

  const handleClickOpen = (index) => {
    setOpen(true);
    setAnsweringIndex(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={() => addAnswer(index)} className="button">
        Adicionar Resposta
      </button>
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
          <button onClick={handleClose}>Cancelar</button>
          <button onClick={handleAnswer}>Adicionar</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ButtonAddAnswer;
