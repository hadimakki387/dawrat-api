import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useAppSelector } from "@/core/StoreWrapper";
import { useDispatch } from "react-redux";
import { setSideBar } from "../redux/homePage-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

type Anchor = "top" | "left" | "bottom" | "right";

export default function SideBar() {
  const { sideBar } = useAppSelector((state) => state.homePage);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    dispatch(setSideBar(!sideBar));
  };

  return (
    <div>
      <React.Fragment>
        <Drawer anchor={"left"} open={sideBar} onClose={() => toggleDrawer()}>
          <div className="w-[15vw] p-4">
            hello
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
