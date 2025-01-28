import React, { useState } from 'react';

import '../styles.css'

function QuizForm({ onSubmit }) {
  const [questions, setQuestions] = useState([
    { text: '', type: 'multipleChoice', options: [''], correctAnswer: '' }
  ]);

  const handleQuestionTextChange = (index, value) => {
    setQuestions(prevQuestions => prevQuestions.map((q, i) =>
      i === index ? { ...q, text: value } : q
    ));
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setQuestions(prevQuestions => prevQuestions.map((q, i) =>
      i === questionIndex
        ? { ...q, options: q.options.map((opt, j) =>
          j === optionIndex ? value : opt
        ) }
        : q
    ));
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: '', type: 'multipleChoice', options: [''], correctAnswer: '' }]);
  };

  const addOption = (questionIndex) => {
    setQuestions(prevQuestions => prevQuestions.map((q, i) =>
      i === questionIndex ? { ...q, options: [...q.options, ''] } : q
    ));
  };

  const removeQuestion = (questionIndex) => {
    setQuestions(prevQuestions => prevQuestions.filter((q, i) => i !== questionIndex));
  };

  const removeOption = (questionIndex, optionIndex) => {
    setQuestions(prevQuestions => prevQuestions.map((q, i) =>
      i === questionIndex
        ? { ...q, options: q.options.filter((opt, j) => j !== optionIndex) }
        : q
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    onSubmit(questions); 
  };

  return (
    <form onSubmit={handleSubmit}> {/* Adicione o onSubmit aqui */}
      {questions.map((q, i) => (
        <div key={i}>
          <input
            type="text"
            placeholder="Digite a pergunta"
            value={q.text}
            onChange={(e) => handleQuestionTextChange(i, e.target.value)}
          />
          <select
            value={q.type}
            onChange={(e) => setQuestions(prevQuestions => prevQuestions.map((q, j) => 
              j === i ? {...q, type: e.target.value} : q
            ))}
          >
            <option value="multipleChoice">Múltipla Escolha</option>
            <option value="text">Texto</option>
          </select>
          {q.type === 'multipleChoice' && (
            <div>
              {q.options.map((option, j) => (
                <div key={j}>
                  <input
                    type="text"
                    placeholder={`Opção ${j + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(i, j, e.target.value)}
                  />
                  <button type="button" onClick={() => removeOption(i, j)}>Remover Opção</button>
                </div>
              ))}
              <button type="button" onClick={() => addOption(i)}>Adicionar Opção</button>
              <div>
                <label htmlFor={`correctAnswer-${i}`}>Resposta Correta:</label>
                <select 
                  id={`correctAnswer-${i}`}
                  value={q.correctAnswer}
                  onChange={(e) => setQuestions(prevQuestions => prevQuestions.map((q, j) => 
                    j === i ? {...q, correctAnswer: e.target.value} : q
                  ))}
                >
                  {q.options.map((option, k) => (
                    <option key={k} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {q.type === 'text' && (
            <div>
              <label htmlFor={`correctAnswerText-${i}`}>Resposta Correta:</label>
              <input 
                type="text"
                id={`correctAnswerText-${i}`}
                value={q.correctAnswer}
                onChange={(e) => setQuestions(prevQuestions => prevQuestions.map((q, j) => 
                  j === i ? {...q, correctAnswer: e.target.value} : q
                ))}
              />
            </div>
          )}
          <button type="button" onClick={() => removeQuestion(i)}>Remover Pergunta</button>
        </div>
      ))}
      <button type="button" onClick={addQuestion}>Adicionar Pergunta</button>
      <button type="submit">Salvar Perguntas</button> 
    </form>
  );
}

export default QuizForm;