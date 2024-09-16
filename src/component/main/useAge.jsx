import React, { useEffect, useState } from "react";

function useAge({}) {
  const [value, setValue] = useState({ day: "", month: "", year: "" });

  // getting the current  date as a separate

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const monthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let day,
    month,
    year = 0; //initiate day ,month and Year

  // getting date

  if (currentDay < value.day) {
    //checking that  current date less than birth date
    day = currentDay - value.day + monthArray[value.month - 1]; // if yes, add the next month to birth day
    currentMonth = currentMonth - 1; // since we took a month from birth month we need to subtract 1 month
  } else {
    day = currentDay - value.day;
  }

  if (currentMonth < value.month) {
    //checking that  current month less than birth month
    month = currentMonth + 12 - value.month; // if yes, add the a year to birth month so ,birth would be increase by 12 month
    currentYear = currentYear - 1;
  } else {
    month = currentMonth - value.month;
  }

  year = currentYear - value.year;

  const age = { year, month, day }; // combining to obj

  for (const key in value) {  
    if (value[key] === "") {
      return [setValue];
    } else {
      return [setValue,age];
    }
  }

}

export default useAge;
