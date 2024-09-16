import React from "react";



function Input(props) {

  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
      />
      <span>{props.errorMessage}</span>
    </div>
  );
}

export default Input;
