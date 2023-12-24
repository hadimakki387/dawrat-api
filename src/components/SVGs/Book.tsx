import React from "react";

// lets add a className for each thing we want to style, so each path will have a className
interface Props {
  fill?: string;
  size?:number
  className?: string;
  path1ClassName?: string;
  path2ClassName?: string;
}

function Book({
  fill = "#4C5966",
  size= 16,
  className,
  path1ClassName,
  path2ClassName,
}: Props) {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      focusable="false"
      data-prefix="fad"
      data-icon="book-blank"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width={size}
      height={size}
      className={className}
    >
      <g>
        <path
          className={path1ClassName}
          fill={fill}
          d="M64 416c0-17.7 14.3-32 32-32H416v64H96c-17.7 0-32-14.3-32-32z"
        ></path>
        <path
          className={path2ClassName}
          fill={fill}
          d="M0 96C0 43 43 0 96 0H384h32c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H352 256 96c-17.7 0-32 14.3-32 32s14.3 32 32 32H256h96 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H384 96c-53 0-96-43-96-96V96z"
        ></path>
      </g>
    </svg>
  );
}

export default Book;
