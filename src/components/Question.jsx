import React from 'react';

function Question({ question }) {
  return (
    <div>
      <p>{question.text}</p>
    </div>
  );
}

export default Question;