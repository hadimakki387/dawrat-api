import React from "react";

interface Props {
  fullRounded?: boolean;
  onClick?: () => any;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  label:string
  className?:string
}

function Button({
  fullRounded = false,
  onClick,
  startIcon,
  endIcon,
  label,
  className,
  ...rest
}: Props) {
  return (
    <button
      className={`${
        fullRounded ? "rounded-full" : "rounded-md"
      }  px-4 py-2 text-subTitleText ${className}`}
      onClick={onClick}
      {...rest}
    >
      {startIcon ? startIcon : null}
      {label}
      {endIcon ? endIcon : null}
    </button>
  );
}

export default Button;
