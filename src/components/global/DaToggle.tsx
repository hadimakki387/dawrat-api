import React, { useRef } from "react";
import { Switch } from "@mui/material";

interface Props {
  hasText?: boolean;
  className?: string;
  text?: string;
  size?: "sm" | "md" | "lg";
  onClick: ()=>any;
  checked: boolean;
}

function DaToggle({
  hasText = true,
  text = "hello",
  size = "sm",
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
