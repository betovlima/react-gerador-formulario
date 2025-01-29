import React from 'react';

function Answer({ answer, isVisible }) {
  return (
    <div style={{ display: isVisible ? 'block' : 'none' }}>
      <p>{answer}</p>
    </div>
  );
}

export default Answer;