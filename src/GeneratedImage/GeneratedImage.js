import React from "react";
import "./GeneratedImage.css";

export default function GeneratedImage(props) {
  return (
    <div data-content={props.number} className="GenerationContainer">
      <div
        className="img"
        style={{
          backgroundImage: `url(${props.img})`,
        }}
      ></div>
      <div
        style={{
          height: "20%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "5px 5px",
        }}
      >
        <p>{props.text}</p>
      </div>
    </div>
  );
}
