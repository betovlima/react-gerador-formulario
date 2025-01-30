import React from "react";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const Question = ({
  question,
  index,
  questions,
  setQuestions,
}) => {
  return (
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
  );
};

export default Question;
