import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../utils/reset.scss";
import "./homePage.scss";

export default function Home() {
  const [isLedOn, setIsLedOn] = useState(false); // At the start, the LED is off
  const [potValue, setPotValue] = useState(0); // Initial potentiometer value

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

  const fetchPotValue = () => {
    axios
      .get("https://robot-project.onrender.com/getPotValue")
      .then((response) => {
        setPotValue(response.data.potValue);
      })
      .catch((error) => {
        console.error("Error fetching potentiometer value:", error);
      });
  };

  useEffect(() => {
    // Fetch the initial potentiometer value
    fetchPotValue();

    // Fetch potentiometer value every 1 second (you can adjust this interval if needed)
    const intervalId = setInterval(fetchPotValue, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

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
      <p className="section-title">Allumer / Eteindre</p>
      <div className="on-off-btn">
        <button className="btn on-btn" onClick={handleOnBtnClick}>
          ON
        </button>
        <button className="btn off-btn" onClick={handleOffBtnClick}>
          OFF
        </button>
      </div>
      <div className="potentiometer-value">
        <p className="pot-section-title">Potentiometer Value</p>
        <span className="pot-value">{potValue}</span>
      </div>
    </div>
  );
}
