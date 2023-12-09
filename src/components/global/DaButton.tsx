import React from "react";
import { start } from "repl";

interface Props {
  fullRounded?: boolean;
  onClick?: () => any;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  label: string;
  className?: string;
  id?: string;
  rest?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  style?: React.CSSProperties;
}

function DaButton({
  fullRounded = false,
  onClick,
  startIcon,
  endIcon,
  label,
  className,
  id,
  style,
  ...rest
}: Props) {
  return (
    <button
      id={id}
      className={`${
        fullRounded ? "rounded-full" : "rounded-md"
      }  px-4 py-2 text-subTitleText ${className} ${
        startIcon || endIcon
          ? "flex justify-between items-center gap-2"
          : "flex justify-center items-center"
      }`}
      onClick={onClick}
      style={style}
      {...rest}
    >
      
        {startIcon ? startIcon : null}
        {label}
        {endIcon ? endIcon : null}
      
    </button>
  );
}

export default DaButton;
