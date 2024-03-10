"use client";
import { Checkbox, CheckboxProps, Switch } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";

interface Props extends CheckboxProps {
  formik?: FormikProps<any>;
  name?: string;
  label?: string;
  isSwitch?: boolean;
  className?: string;
  labelClass?: string;
  size?: "medium" | "small"
}

function DaCheckbox({
  label,
  name,
  checked,
  formik,
  isSwitch = false,
  sx,
  labelClass,
  onChange,
  ...rest
}: Props) {
  const checkRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className={`flex w-min items-center ${rest.className}`}>
      {isSwitch ? (
        <Switch
          inputRef={checkRef}
          checked={name && formik ? formik.values[name] : checked}
          name={name}
          onChange={formik && name ? formik?.handleChange : onChange}
          sx={{
            color: "var(--hint)",
            "&.Mui-checked": {
              color: "var(--primary)",
            },
            ...sx,
          }}
          {...rest}
        />
      ) : (
        <Checkbox
          inputRef={checkRef}
          checked={name && formik ? formik.values[name] : checked}
          name={name}
          onChange={formik && name ? formik?.handleChange : onChange}
          sx={{
            p: 0,
            color: "var(--hint)",
            "&.Mui-checked": {
              color: "var(--primary)",
            },
            "&.Mui-disabled":{
              color: "var(--hint) !important",
            },
            ...sx,
          }}
          {...rest}
        />
      )}
      {label && (
        <p
          className={`text-subtitleText text-sm pl-2 cursor-pointer font-normal select-none whitespace-nowrap ${labelClass}`}
          onClick={() => {
            if (checkRef.current) {
              checkRef.current.click();
            }
          }}>
          {label}
        </p>
      )}
    </div>
  );
}

export default DaCheckbox;
