import React from "react";

function Shape1() {
  return (
    <svg
      id="sw-js-blob-svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <defs>
        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
          <stop
            id="stop1"
            stopColor="rgba(241.913, 255, 4.409, 1)"
            offset="0%"
          ></stop>
          <stop
            id="stop2"
            stopColor="rgba(226.401, 235.718, 57.308, 1)"
            offset="100%"
          ></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#sw-gradient)"
        d="M13.5,-23.3C14.9,-17.5,11.8,-10.1,13.7,-4.4C15.6,1.3,22.5,5.4,25.1,11.5C27.8,17.6,26.2,25.7,21.3,32C16.4,38.3,8.2,42.8,-0.7,43.7C-9.6,44.7,-19.2,42.1,-21.9,35.1C-24.6,28.1,-20.4,16.7,-21.4,8.2C-22.4,-0.3,-28.6,-5.8,-29.2,-11.2C-29.8,-16.6,-24.8,-21.9,-19,-26.4C-13.2,-30.9,-6.6,-34.5,-0.3,-34.1C6,-33.7,12,-29.2,13.5,-23.3Z"
        width="100%"
        height="100%"
        transform="translate(50 50)"
        strokeWidth="0"
        style={{transition: "all 0.3s ease 0s"}}
      ></path>
    </svg>
  );
}

export default Shape1;
