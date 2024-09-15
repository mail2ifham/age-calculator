import React, { useReducer, useRef } from "react";
import "./form-age.css";
import ArrowIcon from "../../assets/images/icon-arrow.svg";
import Input from "../input/Input";

function reducer(state, action) {
  switch (action.type) {
    case "default":
      return {
        ...state,
        [action.payload]: "This felids is required",
      };
    case "patternMismatch":
      return {
        ...state,
        [action.payload]: `Must be a valid ${action.payload}`,
      };

    default:
      state;
  }
}

function FormAge({ setBirthDate, birthDate, handleClick, setGetAge }) {
  const dayInputRef = useRef();
  const monthInputRef = useRef();
  const yearInputRef = useRef();
  const submitRef = useRef();

  const [errorMessage, dispatch] = useReducer(reducer, {
    day: "",
    month: "",
    year: "",
  });

  function isDayOfMonthValidate(date) {
    const totalDayOfMonth = new Date(date.year, date.month, 0).getDate();

    return totalDayOfMonth >= birthDate.day;
  }

  function fieldValidation() {
    const inputsArr = [dayInputRef, monthInputRef, yearInputRef];
    let isValid = (input) => input.current.validity.valid;

    //emptyFieldValidation
    inputsArr.forEach((ref) => {
      if (ref.current.value.trim() === "") {
        console.log(ref.current.validity.valid, ref.current.validity.id);
        ref.current.setCustomValidity("empty field");
        dispatch({ type: "default", payload: ref.current.name });
      }
    });
    return inputsArr.every(isValid);
  }

  function futureValidation() {
    const currentDate = new Date();
    const inputDate = new Date(
      `${birthDate.year}-${birthDate.month}-${birthDate.day}`
    );

    if (inputDate > currentDate) {
      yearInputRef.current.setCustomValidity("futureYearValidation");
      dispatch({ type: "patternMismatch", payload: yearInputRef.current.name });
    }
    return inputDate <= currentDate;
  }

  function handleChange(e) {
    setBirthDate((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  function handleBlur(e) {
    e.target.validity.patternMismatch
      ? dispatch({ type: "patternMismatch", payload: e.target.name })
      : e.target.setCustomValidity("");
  }

  function handleEnterFromSubmitting(e) {
    if (e.keyCode === 13) {
      switch (e.target.name) {
        case "day":
          e.preventDefault();
          monthInputRef.current.focus();
          // monthInputRef.current.select()
          break;
        case "month":
          e.preventDefault();
          yearInputRef.current.focus();
          // yearInputRef.current.select();
          break;
        case "year":
          e.preventDefault();
          submitRef.current.focus();
          handleSubmit();
          break;
        default:
          break;
      }
    }
  }

  function handleSubmit(e) {
    setGetAge({ day: "--", month: "--", year: "--" }); //set previous displayed value to "--"

    if (!isDayOfMonthValidate(birthDate)) {
      dayInputRef.current.setCustomValidity("month last date error");
      dispatch({ type: "patternMismatch", payload: dayInputRef.current.name });
    }
    // fieldValidation() && futureValidation() && handleClick();
    if (fieldValidation() && futureValidation()) {
      handleClick();
      dayInputRef.current.select();
      dayInputRef.current.focus();
    } else {
      yearInputRef.current.select();
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate>
      <div className="form-container">
        <Input
          label="Day"
          id="day"
          name="day"
          placeholder="DD"
          maxLength={2}
          pattern="^(0?[1-9]|[12][0-9]|3[01])$"
          value={birthDate.day}
          handleEnterFromSubmitting={handleEnterFromSubmitting}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errorMessage={errorMessage.day}
          inputRef={dayInputRef}
          autoFocus={true}
        />
        <Input
          label="Month"
          id="month"
          name="month"
          placeholder="MM"
          maxLength={2}
          pattern="^(0?[1-9]|1[0-2])$"
          value={birthDate.month}
          handleEnterFromSubmitting={handleEnterFromSubmitting}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errorMessage={errorMessage.month}
          inputRef={monthInputRef}
        />
        <Input
          label="Year"
          id="year"
          name="year"
          placeholder="YYYY"
          maxLength={4}
          pattern="^\d{4}$"
          value={birthDate.year}
          handleEnterFromSubmitting={handleEnterFromSubmitting}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errorMessage={errorMessage.year}
          inputRef={yearInputRef}
        />
      </div>
      <div className="button">
        <button
          ref={submitRef}
          id="submitBtn"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          <img src={ArrowIcon} alt="" />
        </button>
        <hr />
      </div>
    </form>
  );
}

export default FormAge;
