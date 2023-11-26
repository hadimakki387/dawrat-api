import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Stack from "@mui/joy/Stack";
import Autocomplete from "@mui/joy/Autocomplete";
import { useDispatch } from "react-redux";

interface Props {
  data: Array<any>;
  placeholder: string;
  label?: string;
  setSearch: (value: string) => any;
  setSelectedItem: (value: string) => any;
  style?: React.CSSProperties;
  className?: string;
}

export default function AutoCompleteSearch({
  data = [],
  placeholder,
  label,
  setSearch,
  setSelectedItem,
  style,
  className,
}: Props) {
  const dispatch = useDispatch();
  return (
    <FormControl id="free-solo-2-demo">
      {label && <FormLabel>{label}</FormLabel>}
      <Autocomplete
        placeholder={placeholder}
        type="search"
        onChange={(event, value) => {
          const item = data.find((option) => option.title === value);
          if (item) dispatch(setSelectedItem(item.id));
        }}
        freeSolo
        disableClearable
        options={data.map((option) => option.title)}
        onInputChange={(event, value) => dispatch(setSearch(value))}
        style={style}
        className={`${className}`}
      />
    </FormControl>
  );
}
