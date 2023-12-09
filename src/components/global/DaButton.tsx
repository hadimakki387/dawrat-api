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
<<<<<<< HEAD
<<<<<<< HEAD
      }  ${className} px-4 py-2  text-subTitleText `}
=======
      }  px-4 py-2 text-subTitleText ${className} ${
        startIcon || endIcon ? "flex justify-between items-center gap-2" : ""
      }`}
>>>>>>> b6c241b42af24b11b47602164ecd7f7457d92c2b
=======
      }  px-4 py-2 text-subTitleText ${className} ${
        startIcon || endIcon ? "flex justify-between items-center gap-2" : ""
      }`}
>>>>>>> b6c241b42af24b11b47602164ecd7f7457d92c2b
      onClick={onClick}
      style={style}
      {...rest}
    >
      <div className="flex flex-row gap-2 ">
      {startIcon ? startIcon : null}
      {label}
      {endIcon ? endIcon : null}
      </div>
      
    </button>
  );
}

export default DaButton;
