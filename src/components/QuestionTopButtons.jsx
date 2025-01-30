import "./styles.css";

const QuestionTopButtons = ({
  index,
  editingIndex,
  questions,
  setQuestions,
  setMovedIndex,
  setEditingIndex,
}) => {
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

  const editQuestion = (index) => {
    if (editingIndex === index) {
      setEditingIndex(null);
    } else {
      setEditingIndex(index);
    }
  };

  const deleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "10px",
        justifyContent: "flex-end",
      }}
    >
      <button
        onClick={() => moveQuestionUp(index)}
        className="button-with-margin"
      >
        Mover para cima
      </button>
      <button
        onClick={() => moveQuestionDown(index)}
        className="button-with-margin"
      >
        Mover para baixo
      </button>
      <button
        onClick={() => editQuestion(index)}
        className="button-with-margin"
      >
        {editingIndex === index ? "Salvar" : "Editar"}
      </button>
      <button
        onClick={() => deleteQuestion(index)}
        className="button-with-margin"
      >
        Excluir
      </button>
    </div>
  );
};

export default QuestionTopButtons;
