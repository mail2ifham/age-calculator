import React, { useEffect, useState } from "react";
import FormAge from "../fromAge/FormAge";
import DisplayAge from "../displayAge/DisplayAge";
import "./MainPage.css";
import useAge from "./useAge";

function MainPage() {
  const [setBirthDate, age] = useAge({});
  return (
    <div className="wrapper">
      <FormAge
        setBirthDate={setBirthDate}
      />
      <DisplayAge getAge={age} />
    </div>
  );
}

export default MainPage;
