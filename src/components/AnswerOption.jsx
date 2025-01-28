import React from 'react';

function AnswerOption({ question, option, onClick }) {
  if (question.type === 'multipleChoice') {
    return (
      <button onClick={() => onClick(option)}>
        {option}
      </button>
    );
  } else if (question.type === 'text') {
    return (
      <input
        type="text"
        placeholder="Digite sua resposta"
        onChange={(e) => onClick(e.target.value)}
      />
    );
  }
  return null;
}

export default AnswerOption;