
import React from "react";

// do the same as in the User.tsx file
interface Props {
  width?: string;
  height?: string;
  fill?: string;
  upperFill?: string;
}

function Heart({ width = "16px", height = "16px", fill, upperFill }: Props) {
  return (
    <svg 
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    focusable="false"
    data-prefix="fad"
    data-icon="landmark"

    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 500"
    width={width}
    height={height}>
    <path 
        fill={fill}
        d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
    </svg>
  );
}

export default Heart;
