import React from "react";
import "./form-age.css";
import ArrowIcon from "../../assets/images/icon-arrow.svg";
import { get, useForm } from "react-hook-form";

function FormAge({ setBirthDate }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setFocus,
  } = useForm({
    defaultValues: { day: "", month: "", year: "" },
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log(data);

    setBirthDate(data);
  };

  function lastDayOfMonth(day) {
    const inputMonth = getValues().month;
    const inputYear = getValues().year;
    const totalDayOfMonth = new Date(inputYear, inputMonth, 0).getDate();
    console.log(totalDayOfMonth >= day);

    return totalDayOfMonth >= day;
  }

  function futureValidation(year) {
    const currentDate = new Date();
    const inputDate = new Date(
      `${year}-${getValues().month}-${getValues().day}`
    );

    return inputDate <= currentDate;
  }

  function handleEnter(e) {
    if (e.keyCode === 13) {
      switch (e.target.id) {
        case "day":
          e.preventDefault();
          setFocus("month");
          break;
          case "month":
          e.preventDefault();
          setFocus("year");
          break;
        default:
          break;
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-container">
        <div>
          <label htmlFor="day">day</label>
          <input
            type="text"
            id="day"
            maxLength={2}
            placeholder="DD"
            autoFocus
            onKeyDown={(e) => handleEnter(e)}
            {...register("day", {
              required: { value: true, message: "This field is required" },
              pattern: {
                value: /^(0?[1-9]|[12][0-9]|3[01])$/,
                message: "Must be a valid Day",
              },
              validate: (day) => lastDayOfMonth(day) || "Must be a valid Date",
            })}
          />
          {errors.day && <span>{errors.day.message}</span>}
        </div>
        <div>
          <label htmlFor="month">month</label>
          <input
            type="text"
            id="month"
            maxLength={2}
            placeholder="MM"
            onKeyDown={(e) => handleEnter(e)}
            {...register("month", {
              required: { value: true, message: "This field is required" },
              pattern: {
                value: /^(0?[1-9]|1[0-2])$/,
                message: "Must be a valid Month",
              },
            })}
          />
          {errors.month && <span>{errors.month.message}</span>}
        </div>
        <div>
          <label htmlFor="year">year</label>
          <input
            type="text"
            id="year"
            maxLength={4}
            placeholder="YYYY"
            onKeyDown={(e) => handleEnter(e)}
            {...register("year", {
              required: { value: true, message: "This field is required" },
              pattern: { value: /^\d{4}$/, message: "Must be a valid Year" },
              validate: (year) =>
                futureValidation(year) || "Must be in the past",
            })}
          />
          {errors.year && <span>{errors.year.message}</span>}
        </div>
      </div>

      <div className="button">
        <button id="submitBtn" type="submit">
          <img src={ArrowIcon} alt="" />
        </button>
        <hr />
      </div>
    </form>
  );
}

export default FormAge;

{
  /* <Input
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
        /> */
}
