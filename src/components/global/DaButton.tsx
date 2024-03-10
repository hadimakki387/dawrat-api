import React from "react";

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
  type?: "button" | "submit" | "reset";
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
  type="submit",
  ...rest
}: Props) {
  return (
    <button
    type={type}
      id={id}
      className={`${fullRounded ? "rounded-full" : "rounded-md"}  ${
        !padding ? "px-3 py-1 md:px-4 md:py-2" : ""
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
