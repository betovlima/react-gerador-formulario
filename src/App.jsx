import React, { useState, useEffect } from "react";

const FormBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswerOptions, setCurrentAnswerOptions] = useState("");
  const [answers, setAnswers] = useState({});
  const [movedIndex, setMovedIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const addQuestion = () => {
    if (currentQuestion.trim() === "" || currentAnswerOptions === "") return;
    setQuestions([
      ...questions,
      {
        text: currentQuestion,
        answerOptions: currentAnswerOptions,
      },
    ]);
    setCurrentQuestion("");
    setCurrentAnswerOptions("");
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
    const { answerOptions } = question;

    return (
      <div key={index}>
        <select
          value={question.answerOptions}
          onChange={(e) => {
            const newQuestions = [...questions];
            newQuestions[index].answerOptions = e.target.value;
            setQuestions(newQuestions);
          }}
          style={styles.select}
        >
          <option value="">Selecione as opções de resposta...</option>
          <option value="simNaoNaoSeAplica">Sim/Não/Não se aplica</option>
          <option value="simNao">Sim/Não</option>
          {/* Adicione outras opções aqui, se necessário */}
        </select>
      </div>
    );
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
                    border: "2px solid #4CAF50",
                    animation: "blink 0.5s ease",
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
              </h3>
            )}
            {renderQuestion(question, index)}
          </div>
        ))}
      </div>
      <div style={styles.formControlsBox}>
        <input
          type="text"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          placeholder="Digite a pergunta"
          style={styles.input}
        />

        <select
          value={currentAnswerOptions}
          onChange={(e) => setCurrentAnswerOptions(e.target.value)}
          style={styles.select}
        >
          <option value="">Selecione as opções de resposta...</option>
          <option value="simNaoNaoSeAplica">Sim/Não/Não se aplica</option>
          <option value="simNao">Sim/Não</option>
        </select>

        <button onClick={addQuestion} style={styles.button}>
          Adicionar
        </button>
      </div>
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
