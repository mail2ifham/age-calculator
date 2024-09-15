import React, { useEffect, useState } from "react";
import FormAge from "../fromAge/FormAge";
import DisplayAge from "../displayAge/DisplayAge";
import "./MainPage.css";
import useAge from "./useAge";

function MainPage() {
  const [birthDate, setBirthDate, age] = useAge({});
  const [getAge, setGetAge] = useState({});

  function handleClick() {
    setGetAge(age);
  }
  return (
    <div className="wrapper">
      <FormAge
        setBirthDate={setBirthDate}
        birthDate={birthDate}
        handleClick={handleClick}
        setGetAge={setGetAge}

      />
      <DisplayAge getAge={getAge} />
    </div>
  );
}

export default MainPage;
