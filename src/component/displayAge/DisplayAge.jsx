import React from "react";
import "./display-age.css";

function DisplayAge({ getAge ={day:'--',month:'--',year:'--'}}) {
  return (
    <div className="display-container">
      {" "}
      <p className="years ">
        <span className="purple-color">
          {getAge.year >= 0 ? `${getAge.year} ` : "-- "}
        </span>
        years
      </p>
      <p className="months">
        <span className="purple-color">
          {getAge.month >= 0 ? `${getAge.month} ` : "-- "}
        </span>{" "}
        months
      </p>
      <p className="days">
        <span className="purple-color">
          {getAge.day >= 0 ? `${getAge.day} ` : "-- "}
        </span>{" "}
        days
      </p>
    </div>
  );
}

export default DisplayAge;
