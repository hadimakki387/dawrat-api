import * as React from "react";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { SxProps } from "@mui/material";

type Props = TabsProps & {
  tabs: string[];
  value: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (newValue: number) => any;
  tabSx?: SxProps;
};
function TabsSwitch({ tabs, value, onChange, sx, tabSx }: Props) {
  return (
    <Tabs
      variant="scrollable"
      scrollButtons="auto"
      value={value}
      onChange={(_, newValue: number) => {
        onChange(newValue);
      }}

      sx={{
        width: "100%",
        
        ".MuiTabs-indicator": {
          backgroundColor: "var(--primary)",
        },
        ".MuiTab-root": {
          color: "var(--hint)",
          fontSize: "var(--text-sm)",

          "&.Mui-selected": {
            color: "var(--primary-color)",
            fontWeight: "bold",
            
          },
        },

        ...sx,
      }}
    >
      {tabs.map((tab, index) => (
        <Tab
          key={`${tab}-${index}`}
          label={tab}
          sx={{
            ...tabSx,
          }}
          
        />
      ))}
    </Tabs>
  );
}

export default TabsSwitch;

