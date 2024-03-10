import Autocomplete from "@mui/joy/Autocomplete";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import * as React from "react";

interface Props {
  data: Array<any>;
  placeholder: string;
  label?: string;
  // eslint-disable-next-line no-unused-vars
  setSearch?: (value: string) => any;
  // eslint-disable-next-line no-unused-vars
  setSelectedItem?: (value: string) => any;
  style?: React.CSSProperties;
  className?: string;
  name?: string;
  formik?: any; // Add formik prop
  defaultValue?: string;
  disabled?: boolean;
  loading?: boolean;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  handleSubmit?: (e: any) => any;
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
  value,
}: Props) {

  const [menuItems, setMenuItems] = React.useState(data);

  React.useEffect(() => {
    setMenuItems(data);
  }, [data]);

  return (
    <FormControl id="free-solo-2-demo" >
      {label && <FormLabel>{label}</FormLabel>}
      <Autocomplete
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        type="search"
        onChange={(event, value) => {
          const selectedItem = menuItems.find((item) => item.title === value);
          if (setSelectedItem) setSelectedItem(selectedItem.id);
          formik?.setFieldValue(name, selectedItem.id);
        }}
        freeSolo
        disableClearable
        loading={true}
        noOptionsText="No options found"
        loadingText="Loading..."
        options={menuItems.map((option) => option.title)}
        onInputChange={(event, value) => {
          if (setSearch) setSearch(value);
          formik?.setFieldValue(name, value);
        }}
        value={value && value}
        style={style}
        className={`${className}`}
        disabled={disabled}
        sx={{
          "&.Mui-disabled": {
            backgroundColor: "var(--silver-bg)",
          },

          width: "100%",
        }}
      />
      {name && formik?.errors[name] && (
        <div className="text-sm text-error">{formik?.errors[name]}</div>
      )}
    </FormControl>
  );
}
