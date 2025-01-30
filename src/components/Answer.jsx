import "./styles.css";

function Answer({ addQuestion, currentQuestion, setCurrentQuestion }) {
  return (
    <div className="form-controls-box">
      <textarea
        type="text"
        value={currentQuestion}
        onChange={(e) => setCurrentQuestion(e.target.value)}
        placeholder="Digite a pergunta"
        className="input"
      />
      <button onClick={addQuestion} className="button">
        Adicionar
      </button>
    </div>
  );
}

export default Answer;
