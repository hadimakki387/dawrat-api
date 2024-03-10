import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import React from "react";

interface Props {
  // eslint-disable-next-line no-unused-vars
  onChange: (event: SelectChangeEvent) => any;
  disabled?: boolean;
  options: {
    label: string;
    value: string;
  }[];
  label:string
}

function DropDown({  disabled = false, options, label }: Props) {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <FormControl  sx={{  minWidth: 120}}>
      <InputLabel id="demo-simple-select-label" >{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        onChange={handleChange}
        disabled={disabled}
        className="bg-white"
        size="small"
      >
        {options.map((option, index) => {
          return (
            <MenuItem value={option.value} key={index}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default DropDown;
