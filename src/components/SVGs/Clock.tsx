import React from "react";

interface Props {
  fill?: string;
  width?: string;
  height?: string;
  className?: string;
}

function Clock({
  fill = "#4C5966",
  width = "16px",
  height = "16px",
  className,
}: Props) {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="clock"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={width}
      height={height}
      className={className}
    >
      <path
        fill={fill}
        d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
      ></path>
    </svg>
  );
}

export default Clock;
