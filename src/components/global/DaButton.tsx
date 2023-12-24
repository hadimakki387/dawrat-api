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
  padding?: boolean;
  disabled?: boolean;
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
  padding,
  disabled,
  ...rest
}: Props) {
  return (
    <button
      id={id}
      className={`${fullRounded ? "rounded-full" : "rounded-md"}  ${
        !padding ? "px-4 py-2" : ""
      } text-subTitleText  ${
        startIcon || endIcon
          ? "flex justify-between items-center gap-2"
          : "flex justify-center items-center"
      } ${className}`}
      onClick={onClick}
      style={{
        ...style,
        backgroundColor: disabled ? "var(--hint)" : "",
      }}
      disabled={disabled}
      {...rest}
    >
      {startIcon ? startIcon : null}
      {label}
      {endIcon ? endIcon : null}
    </button>
  );
}

export default DaButton;
