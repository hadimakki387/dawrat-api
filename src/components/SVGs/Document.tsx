import React from "react";

// the same as user.tsx

interface Props {
  width?: string;
  height?: string;
  fill?: string;
  patternFill?: string;
}

function Document({ width, height, fill, patternFill }: Props) {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      focusable="false"
      data-prefix="fad"
      data-icon="file-lines"

      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      width={width}
      height={height}
    >
      <g className="fa-duotone-group">
        <path
          fill={fill}
          d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM112 256c-8.8 0-16 7.2-16 16s7.2 16 16 16H272c8.8 0 16-7.2 16-16s-7.2-16-16-16H112zm0 64c-8.8 0-16 7.2-16 16s7.2 16 16 16H272c8.8 0 16-7.2 16-16s-7.2-16-16-16H112zm0 64c-8.8 0-16 7.2-16 16s7.2 16 16 16H272c8.8 0 16-7.2 16-16s-7.2-16-16-16H112z"
        ></path>
        <path
          fill={patternFill ? patternFill : fill}
          d="M384 160L224 0V128c0 17.7 14.3 32 32 32H384zM112 256c-8.8 0-16 7.2-16 16s7.2 16 16 16H272c8.8 0 16-7.2 16-16s-7.2-16-16-16H112zm0 64c-8.8 0-16 7.2-16 16s7.2 16 16 16H272c8.8 0 16-7.2 16-16s-7.2-16-16-16H112zm0 64c-8.8 0-16 7.2-16 16s7.2 16 16 16H272c8.8 0 16-7.2 16-16s-7.2-16-16-16H112z"
        ></path>
      </g>
    </svg>
  );
}

export default Document;
