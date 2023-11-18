import React from "react";

// do the same as in the User.tsx file
interface Props {
  width?: string;
  height?: string;
  fill?: string;
}

function Institution({ width, height, fill }: Props) {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      focusable="false"
      data-prefix="fad"
      data-icon="landmark"
      className="svg-inline--fa fa-landmark "
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={width}
      height={height}
    >
      <g className="fa-duotone-group">
        <path
          className="fa-secondary"
          fill={fill}
          d="M128 192H64V420.3c-.6 .3-1.2 .7-1.7 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V192H384V416H344V192H280V416H232V192H168V416H128V192z"
        ></path>
        <path
          className="fa-primary"
          fill={fill}
          d="M271.9 4.2c-9.8-5.6-21.9-5.6-31.8 0l-224 128c-12.6 7.2-18.8 22-15.1 36S17.5 192 32 192H480c14.5 0 27.2-9.8 30.9-23.8s-2.5-28.8-15-36l-224-128z"
        ></path>
      </g>
    </svg>
  );
}

export default Institution;
