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
import { setSideBar, setSignIn, setSignUp } from "../redux/homePage-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import DaButton from "@/components/global/DaButton";

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
          <div className="w-[70vw] p-4 space-y-2">
            <div className="font-bold text-black text-lg">Welcome To Dawrat</div>
            <div className="text-sm text-subTitleText">
              Sign in to access the best study resources for your university
            </div>
            <div className="flex gap-4 items-center justify-center">
              <DaButton
                fullRounded
                label="Sign In"
                className="white border border-primary text-white max-sm:text-sm w-1/2 font-semibold"
                onClick={() => {
                  dispatch(setSignIn(true));
                  dispatch(setSideBar(false));
                }}
                style={{color:"var(--primary)"}}
              />
              <DaButton
                fullRounded
                label="Sign Up"
                className="bg-green-500 text-white max-sm:text-sm w-1/2 font-semibold"
                onClick={() => {
                  dispatch(setSignUp(true));
                  dispatch(setSideBar(false));
                }}
                
              />
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
