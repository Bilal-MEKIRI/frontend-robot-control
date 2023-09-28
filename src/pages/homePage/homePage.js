import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../utils/reset.scss";
import "./homePage.scss";

export default function Home() {
  const [isLedOn, setIsLedOn] = useState(false); // At the start, the led is off

  useEffect(() => {
    console.log("LED state: ", isLedOn ? "ON" : "OFF");

    axios
      .post("https://robot-project.onrender.com/ledState", {
        ledState: isLedOn ? "ON" : "OFF",
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [isLedOn]);

  const handleOnBtnClick = () => {
    if (!isLedOn) {
      // Only turn on if it's currently off
      setIsLedOn(true);
    }
  };

  const handleOffBtnClick = () => {
    if (isLedOn) {
      // Only turn off if it's currently on
      setIsLedOn(false);
    }
  };

  return (
    <div className="home">
      <h1 className="robot-emoji">🤖</h1>
      <h1 className="main-title">Interface Robot</h1>
      <div className="on-off-btn">
        <p className="section-title">Allumer / Eteindre</p>
        <button className="btn on-btn" onClick={handleOnBtnClick}>
          ON
        </button>
        <button className="btn off-btn" onClick={handleOffBtnClick}>
          OFF
        </button>
      </div>
    </div>
  );
}
