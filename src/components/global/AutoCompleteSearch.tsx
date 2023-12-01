import * as React from "react";
import { useFormik } from "formik";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Stack from "@mui/joy/Stack";
import Autocomplete from "@mui/joy/Autocomplete";
import { useDispatch } from "react-redux";

interface Props {
  data: Array<any>;
  placeholder: string;
  label?: string;
  setSearch?: (value: string) => any;
  setSelectedItem: (value: string) => any;
  style?: React.CSSProperties;
  className?: string;
  name?: string;
  formik?: any; // Add formik prop
}

export default function AutoCompleteSearch({
  data = [],
  placeholder,
  label,
  setSearch,
  setSelectedItem,
  style,
  className,
  name,
  formik, // Assign formik prop
}: Props) {
  const dispatch = useDispatch();

  if(name){
    console.log("these are the values")
    console.log(formik?.errors[name]);
    console.log(formik?.touched[name]);
  }



  return (
    <FormControl id="free-solo-2-demo">
      {label && <FormLabel>{label}</FormLabel>}
      <Autocomplete
        name={name}
        placeholder={placeholder}
        type="search"
        onChange={(event, value) => {
          formik?.setFieldValue(name, value);
        }}
        freeSolo
        disableClearable
        options={data.map((option) => option.title)}
        onInputChange={(event, value) => {
          if (setSearch) dispatch(setSearch(value));
          formik?.setFieldValue(name, value);
        }}
        
        style={style}
        className={`${className}`}
      />
      {name && formik?.errors[name]  && (
        <div className="text-sm text-error">{formik?.errors[name]}</div>
      )}
    </FormControl>
  );
}
