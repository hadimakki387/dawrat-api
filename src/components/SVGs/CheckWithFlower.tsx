import React from "react";

interface Props {
  size?:number;
  fill?: string;
  outerFill?: string;
    innerFill?: string;
}

function CheckWithFlower({ size=16 ,outerFill="var(--pink-bg)",innerFill="var(--pink)"}) {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      focusable="false"
      data-prefix="fad"
      data-icon="badge-check"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
    >
      <g className="fa-duotone-group">
        <path
          
          fill={outerFill}
          d="M256 0c36.8 0 68.8 20.7 84.9 51.1C373.8 41 411 49 437 75s34 63.3 23.9 96.1C491.3 187.2 512 219.2 512 256s-20.7 68.8-51.1 84.9C471 373.8 463 411 437 437s-63.3 34-96.1 23.9C324.8 491.3 292.8 512 256 512s-68.8-20.7-84.9-51.1C138.2 471 101 463 75 437s-34-63.3-23.9-96.1C20.7 324.8 0 292.8 0 256s20.7-68.8 51.1-84.9C41 138.2 49 101 75 75s63.3-34 96.1-23.9C187.2 20.7 219.2 0 256 0zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
        ></path>
        <path
          
          fill={innerFill}
          d="M369 175c9.4 9.4 9.4 24.6 0 33.9L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0z"
        ></path>
      </g>
    </svg>
  );
}

export default CheckWithFlower;
