import React from "react";

function Question({ question }) {
  return (
      <div style={style.question}>
        <h3>{question}</h3>
      </div>
  );
}

const style = {
  question: {
    border: "1px solid rgb(204, 204, 204)",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "5px",
    display: "flex",
    maxWidth: "80%",
    width: "34%",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    width: "100%",
    flex: 1,
    maxWidth: "300px",
  },
};

export default Question;
