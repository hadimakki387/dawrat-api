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
  setSelectedItem?: (value: string) => any;
  style?: React.CSSProperties;
  className?: string;
  name?: string;
  formik?: any; // Add formik prop
  defaultValue?: string;
  disabled?:boolean
  loading?:boolean
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
  defaultValue,
  formik, // Assign formik prop
  disabled,
  loading
}: Props) {
  const dispatch = useDispatch();
  const [menuItems  , setMenuItems] = React.useState(data)

  React.useEffect(() => {
    setMenuItems(data)
  }, [data])



  

  return (
    <FormControl id="free-solo-2-demo">
      {label && <FormLabel>{label}</FormLabel>}
      <Autocomplete
    
      defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        type="search"
        onChange={(event, value) => {
          const selectedItem = menuItems.find((item) => item.title === value);
          if (setSelectedItem) dispatch(setSelectedItem(selectedItem.id));
          formik?.setFieldValue(name, selectedItem.id);
        }}
        freeSolo
        disableClearable
      
        loading={true}
        noOptionsText="No options found"
        loadingText="Loading..."
        options={menuItems.map((option) => option.title)}
        onInputChange={(event, value) => {
          if (setSearch) dispatch(setSearch(value));
          formik?.setFieldValue(name, value);
        }}
        style={style}
        className={`${className}`}
        disabled={disabled}
        sx={{
          "&.Mui-disabled": {
            backgroundColor: "var(--silver-bg)"
          },
       
          width:"100%",
 
        }}

      />
      {name && formik?.errors[name] && (
        <div className="text-sm text-error">{formik?.errors[name]}</div>
      )}
    </FormControl>
  );
}
