"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useScroll from "@/hooks/useScroll";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/core/StoreWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { setSideBar, setSignIn, setSignUp } from "@/core/features/landingPage/redux/homePage-slice";
import Link from "next/link";
import Button from "../global/Button";
import DropDown from "../global/DropDown";
import { TextField, styled } from "@mui/material";
import TextFieldComponent from "../global/TextFieldComponent";

function LandingNavBar() {
  const Scroll = useScroll();
  console.log(`this is the scroll ${Scroll.y}`);
  const dispatch = useDispatch();

  const CssTextField = styled(TextField)({
    color: "#A0AAB4",
    "& label.Mui-focused": {
      color: "#A0AAB4",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#B2BAC2",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#E0E3E7",
      },
      "&:hover fieldset": {
        borderColor: "#B2BAC2",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#6F7E8C",
      },
    },
  });

  return (
    <div
      className={` w-full fixed top-0 left-0 p-5  ${
        Scroll.y > 0
          ? "bg-[#ffffffbe] backdrop-blur-md text-black"
          : "text-white bg-transparent"
      } transition-all duration-500 flex justify-between items-center z-50`}
    >
      <div className="flex gap-4">
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => dispatch(setSideBar(true))}
          className="w-6 h-6 hover:cursor-pointer"
        />
        <Link href={""} className="font-medium">
          University
        </Link>
        <Link href={""} className="font-medium">
          Documents
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <Button
          fullRounded
          label="Sign In"
          className="bg-green-500 text-white"
          onClick={()=>dispatch(setSignIn(true))}
        />
        <Button
          fullRounded
          label="Sign Up"
          className="bg-green-500 text-white"
          onClick={()=>dispatch(setSignUp(true))}
        />

        <div>Language</div>
        
      </div>
    </div>
  );
}

export default LandingNavBar;
