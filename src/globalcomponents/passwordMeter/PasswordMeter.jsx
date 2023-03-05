import React, { useState, useEffect } from "react";
import "./pm.scss";

import zxcvbn from "zxcvbn";

const PasswordMeter = ({
  inputValue,
  top,
  right,
  passStrength,
  setPassStrength,
}) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    const score = zxcvbn(inputValue).score;
    setPassStrength(score);

    //tried a switchs statement but didnt work for some reason so just gonna use a load of if statements
    if (score === 0) {
      setColor("#e1001f");
    }

    if (score === 1) {
      setColor("#e5801b");
    }

    if (score === 2) {
      setColor("#e1c511");
    }

    if (score === 3) {
      setColor("#0bea56");
    }

    if (score === 4) {
      setColor("#1fc132");
    }
  }, [inputValue]);

  return (
    <div
      className='pm-parent'
      style={{
        top: top,
        right: right,
        display: inputValue.length === 0 && "none",
      }}
    >
      <div
        className='pm-metertop'
        style={{ backgroundColor: passStrength >= 4 && color }}
      ></div>
      <div
        className='pm-meter'
        style={{ backgroundColor: passStrength >= 3 && color }}
      ></div>
      <div
        className='pm-meter'
        style={{ backgroundColor: passStrength >= 2 && color }}
      ></div>
      <div
        className='pm-meter'
        style={{ backgroundColor: passStrength >= 1 && color }}
      ></div>
      <div className='pm-meterbottom' style={{ backgroundColor: color }}></div>
    </div>
  );
};

export default PasswordMeter;
