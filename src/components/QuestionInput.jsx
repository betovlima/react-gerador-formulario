import React from "react";

function QuestionInput({ value, onChange, onAdd }) {
  return (
    <div style={styles.question}>
      <textarea
        type="text"
        placeholder="Digite a pergunta"
        value={value}
        onChange={onChange}
        style={styles.input}
      />
      <button onClick={onAdd} style={styles.button}>
        Adicionar
      </button>
    </div>
  );
}

const styles = {
  question: {
    border: "1px solid #ccc",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "5px",
    display: "flex",
    maxWidth: "80%",
    width: "34%",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    width: "301px",
    height: "165px",
    flex: "1 1 0%",
    maxWidth: "300px"
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
};

export default QuestionInput;