function Answer({ addQuestion, currentQuestion, setCurrentQuestion }) {

  return (
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
  );
}
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
    padding: "8px",
    fontSize: "16px",
    width: "100%",
    flex: 1,
    maxWidth: "300px",
  },
};

export default Answer;
