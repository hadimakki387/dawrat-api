import React from "react";

// do the same as in the User.tsx file
interface Props {
  size?: number;
  fill?: string;
  upperFill?: string;
}

function Upload({ size=16, fill,  }: Props) {
  return (
    <svg 
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    focusable="false"
    data-prefix="fad"
    data-icon="landmark"

    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 630 500"
    width={size}
    height={size}
    >
        
    {/* <path 
    fill={fill}
    d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>  */}
    <path 
        fill={fill}
        d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/>
    </svg>
  );
}

export default Upload;
