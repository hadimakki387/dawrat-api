import React from "react";
interface Props {
  fill?: string;
  size?: number;
  className?: string;
}

function StudyList({
  fill = "#4C5966",
  size = 16,
  className,
}: Props) {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="folder-bookmark"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
    >
      <path
        fill={fill}
        d="M448 480H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H192c20.1 0 39.1 9.5 51.2 25.6l19.2 25.6c6 8.1 15.5 12.8 25.6 12.8H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64zM288 176V336c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L368 308l54.4 40.8c4.8 3.6 11.3 4.2 16.8 1.5s8.8-8.2 8.8-14.3V176c0-8.8-7.2-16-16-16H304c-8.8 0-16 7.2-16 16z"
      ></path>
    </svg>
  );
}

export default StudyList;
