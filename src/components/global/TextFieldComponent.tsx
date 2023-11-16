"use client";
import { DropdownValue } from "@/services/types";
import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import { FormikProps } from "formik";
import React, { ReactNode } from "react";

export type CITextfieldProps = TextFieldProps & {
  center?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  formik?: FormikProps<any>;
  hasShadow?: boolean;
  noValue?: boolean;
  options?: DropdownValue[];
  noBorders?: boolean;
  multiple?: boolean;
  className?: string;
  whiteInput?: boolean;
  leadingText?: string;
};

export default function TextFieldComponent({
  type,
  autoComplete,
  rows,
  maxRows,
  fullWidth = true,
  multiline,
  sx,
  label,
  placeholder,
  value,
  onBlur,
  name,
  error,
  helperText,
  center,
  leadingIcon,
  trailingIcon,
  onChange,
  hasShadow = false,
  formik,
  noValue = false,
  options = [],
  multiple = false,
  select = false,
  noBorders = false,
  className,
  whiteInput = false,
  leadingText,
  ...rest
}: CITextfieldProps) {
  const textField = (
    <>
    {leadingText && <div className="-mb-2">{leadingText}</div>}
    <TextField
      type={type}
      autoComplete={autoComplete}
      rows={rows}
      maxRows={maxRows}
      fullWidth={fullWidth}
      multiline={multiline}
      value={noValue ? undefined : formik && name ? formik.values[name] : value}
      onBlur={formik && name ? formik.handleBlur : onBlur}
      onChange={formik && name ? formik.handleChange : onChange}
      name={name}
      error={
        formik && name
          ? Boolean(formik.touched[name] && formik.errors[name])
          : error
      }
      helperText={
        formik && name
          ? (formik.touched[name] && formik.errors[name]?.toString()) ||
            helperText
          : helperText
      }
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "transparent",
          boxShadow: hasShadow ? "var(--shadow)" : undefined,
          borderRadius: "var(--input-border-radius)",
          "& fieldset": {
            borderColor: noBorders
              ? "transparent !important"
              : (formik &&
                  name &&
                  formik.touched[name] &&
                  formik.errors[name]) ||
                error
              ? "var(--error) !important"
              : "var(--input-border) !important",
            borderRadius: "var(--input-border-radius)",
          },
          "&:hover fieldset": {
            borderColor: noBorders
              ? "transparent !important"
              : (formik &&
                  name &&
                  formik.touched[name] &&
                  formik.errors[name]) ||
                error
              ? "var(--error) !important"
              : "var(--input-border) !important",
            borderRadius: "var(--input-border-radius)",
          },
          "&.Mui-focused fieldset": {
            borderColor: noBorders
              ? "transparent !important"
              : (formik &&
                  name &&
                  formik.touched[name] &&
                  formik.errors[name]) ||
                error
              ? "var(--error)"
              : "var(--primary) !important",
            borderRadius: "var(--input-border-radius)",
          },
        },
        "& .MuiOutlinedInput-input": {
          color: whiteInput ? "white" : "black",
        },
        "& .MuiInputLabel-root": {
          color: whiteInput ? "white" : "black",

          "&.Mui-focused": {
            color: whiteInput ? "white" : "black",
          },
        },

        "& .MuiInputAdornment-root": {
          color: whiteInput ? "white" : "var(--text-primary) !important",
        },

        ...(sx || {}),
      }}
      InputProps={{
        startAdornment: leadingIcon,
        endAdornment: trailingIcon,
        ...rest.InputProps,
      }}
      inputProps={{
        style: {
          textAlign: center ? "center" : "left",
          ...rest.inputProps?.style,
        },
        ...rest.inputProps,
      }}
      label={label}
      placeholder={placeholder}
      select={select}
      size="small"
      SelectProps={{
        MenuProps: {
          sx: {
            marginTop: "2px",
          },
        },
        multiple: multiple,
        fullWidth: true,
        ...(rest.SelectProps || {}),
      }}
      InputLabelProps={{
        sx: {
          color: "var(--hint) !important",
        },
        ...(rest.InputLabelProps || {}),
      }}
      {...rest}
    >
      {options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "var(--primary) !important",
              color: "white !important",
            },
          }}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
    </>
    
  );

  return className ? <div className={className}>{textField}</div> : textField;
}
