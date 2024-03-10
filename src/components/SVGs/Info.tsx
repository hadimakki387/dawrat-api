import React from "react";

// do the same as in the User.tsx file
interface Props {
  size?: number;
  fill?: string;
  upperFill?: string;
}

function Info({  size=16 , fill,  }: Props) {
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
    width={size}
    height={size}>
   <path 
    fill={fill}
    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
   </svg>
  );
}

export default Info;
