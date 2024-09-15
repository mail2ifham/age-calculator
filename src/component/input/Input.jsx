import React from "react";



function Input(props) {

  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={props.inputRef}
        id={props.id}
        name={props.name}
        type="text"
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        pattern={props.pattern}
        required
        value={props.value}
        autoFocus={props.autoFocus}
        onKeyDown={(e) => props.handleEnterFromSubmitting(e)}
        onChange={(e) => props.handleChange(e)}
        onBlur={(e) => props.handleBlur(e)}

      />
      <span>{props.errorMessage}</span>
    </div>
  );
}

export default Input;
