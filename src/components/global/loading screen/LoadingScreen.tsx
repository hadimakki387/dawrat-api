import React from "react";
import "./index.css";

function LoadingScreen() {
  return (
    <div
      className="w-screen h-screen flex justify-center items-center bg-[var(--bg)]"
      style={{
        fontSize: "calc(16px + (24 - 16) * (100vw - 320px) / (1280 - 320))",
      }}
    >
      <div className="book">
        <div className="book__pg-shadow"></div>
        <div className="book__pg"></div>
        <div className="book__pg book__pg--2"></div>
        <div className="book__pg book__pg--3"></div>
        <div className="book__pg book__pg--4"></div>
        <div className="book__pg book__pg--5"></div>
      </div>
    </div>
  );
}

export default LoadingScreen;
