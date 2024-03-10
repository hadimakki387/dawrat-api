import { Switch } from "@mui/material";
import React from "react";

interface Props {
  hasText?: boolean;
  className?: string;
  text?: string;
  size?: "small" | "medium";
  onClick: ()=>any;
  checked: boolean;
}

function DaToggle({
  hasText = true,
  text = "hello",
  size = "small",
  onClick,
  checked = true,
  ...props
}: Props) {

  const checkRef = React.useRef<HTMLInputElement>();
  
  return (
    <div className="flex items-center ">
        <Switch
          inputRef={checkRef}
          checked={checked}
          name="hello"
          onClick={onClick}
          size={size}
          {...props}
        />
        {hasText && (
        <span className=" text-sm font-medium text-subTitleText ">
          {text}
        </span>
      )}
    </div>
  );
}

export default DaToggle;
