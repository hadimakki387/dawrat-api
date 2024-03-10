"use client";
import { DropdownValue } from "@/services/types";
import { Autocomplete, Chip, SxProps } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import DaCheckbox from "./DaCheckbox";
import TextFieldComponent from "./TextFieldComponent";

export type CIAutocompleteProps = {
  sx?: SxProps;
  label?: string;
  placeholder?: string;
  className?: string;
  limitTags?: number;
  formik?: FormikProps<any>;
  // eslint-disable-next-line no-unused-vars
  onChange?: (newValue: DropdownValue | DropdownValue[] | null) => void;
  name?: string;
  multiple?: boolean;
  hasCheckboxes?: boolean;
  options?: DropdownValue[];
  size?: "small" | "medium" | undefined;
  onItemClicked?: (
    // eslint-disable-next-line no-unused-vars
    item: DropdownValue,
    // eslint-disable-next-line no-unused-vars
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => boolean | void;
  // eslint-disable-next-line no-unused-vars
  getOptionDisabled?: (option: DropdownValue) => boolean;
  renderTags?: (
    // eslint-disable-next-line no-unused-vars
    value: DropdownValue | DropdownValue[],
    // eslint-disable-next-line no-unused-vars
    getTagProps: any
  ) => React.ReactNode;
  noBorders?: boolean;
  whiteInput?: boolean;
  [key: string]: any;
  labelColor?: string;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onInputChange?:(e:string)=>void
};

function DaAutocomplete({
  options = [],
  placeholder,
  label,
  size = "small",
  limitTags = 4,
  className,
  onChange,
  name,
  formik,
  multiple = false,
  hasCheckboxes = true,
  sx,
  value,
  onItemClicked,
  getOptionDisabled,
  noBorders,
  disableCloseOnSelect = true,
  whiteInput = false,
  renderTags,
  labelColor,
  disabled = false,
  onInputChange,
  ...props
}: CIAutocompleteProps) {
  const autoComplete = (
    <Autocomplete
      disabled={disabled}
      isOptionEqualToValue={(option, value) => option?.value === value?.value}
      getOptionDisabled={getOptionDisabled}
      multiple={multiple}
      groupBy={(option) => option?.group || ""}
      size={size}
      options={options}
      disableCloseOnSelect={disableCloseOnSelect}
      limitTags={limitTags}
      getOptionLabel={(option) => option?.label}
      onInput={(e)=>{
        if(onInputChange)onInputChange((e.target as HTMLInputElement).value)
      }}

      renderOption={(props, option, { selected }) => {
        return (
          <li
            {...props}
            key={`option-${option?.value}`}
            className={`${props.className}`}
            onClick={(e) => {
              if (onItemClicked) {
                const shouldClose = onItemClicked(option, e);
                if (shouldClose !== false) {
                  props.onClick && props.onClick(e);
                }
              } else {
                props.onClick && props.onClick(e);
              }
            }}
          >
            {hasCheckboxes && option?.label!== "loading..." && (
              <DaCheckbox style={{ marginRight: 8 }} checked={selected} />
            )}
            {option.label}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextFieldComponent
          {...params}
          label={label}
          placeholder={placeholder}
          fullWidth
          whiteInput={whiteInput}
          error={Boolean(
            formik && name && formik.touched[name] && !!formik.errors[name]
          )}
          helperText={
            formik &&
            name &&
            formik.touched[name] &&
            (formik.errors[name] as any)
          }
          noBorders={noBorders}
          disabled={disabled}
          sx={{
            borderRadius:"var(--input-border-radius)",
            backgroundColor:disabled?"var(--silver-bg)":undefined,
            color:"var(--title-text)"
          }}
        />
      )}
      onBlur={() => {
        formik && name && formik.setFieldTouched(name, true);
      }}
      renderGroup={({ key, ...params }) => (
        <div
          {...params}
          key={key}
          className={"border-b border-stone-200 last-of-type:border-none"}
        >
          {params.children}
        </div>
      )}
      sx={{
        // select the arrows and clear icons and change their color
        "& .MuiAutocomplete-popupIndicator": {
          color: whiteInput ? "white !important" : "black !important",
        },
        "& .MuiAutocomplete-clearIndicator": {
          color: whiteInput ? "white !important" : "black !important",
        },
        "& .MuiInputLabel-root": {
          color: labelColor ? labelColor : "var(--title-text)",
          "&.Mui-focused": {
            color: labelColor ? labelColor : "var(--title-text)",
          },
        },
        "& .MuiSvgIcon-root": {
          color: labelColor ? labelColor : "var(--title-text)",
        },
        
        ...sx,
      }}
      fullWidth
      renderTags={
        renderTags
          ? renderTags
          : (value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...props } = getTagProps({ index });
                return (
                  <Chip
                    {...props}
                    key={key}
                    label={option?.label}
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid var(--hint)",
                      height: size === "small" ? 26 : 32,
                      width: "fit-content",
                      margin: "1px 2px",
                    }}
                  />
                );
              })
      }
      onChange={(_event, newValue) => {
        onChange && onChange(newValue);
        if (formik && name) {
          formik.setFieldValue(name, newValue);
        }
      }}
      value={formik && name ? formik.values[name] : value}
      {...props}
    />
  );

  return className ? (
    <div className={className}>{autoComplete}</div>
  ) : (
    autoComplete
  );
}

export default DaAutocomplete;
