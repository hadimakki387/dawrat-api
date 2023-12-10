"use client";
import {
  setSideBar,
  setSignIn,
  setSignUp,
} from "@/core/features/landingPage/redux/homePage-slice";
import { useGetUserQuery } from "@/core/rtk-query/user";
import useScroll from "@/hooks/useScroll";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField, styled } from "@mui/material";
import NavLoader from "../global/navLoader/NavLoader";
import Cookies from "js-cookie";
import Link from "next/link";
import { useDispatch } from "react-redux";
import DaButton from "../global/DaButton";

function LandingNavBar() {
  const Scroll = useScroll();
  console.log(`this is the scroll ${Scroll.y}`);
  const dispatch = useDispatch();
  const id = Cookies.get("dawratUserId");
  const { data, isLoading } = useGetUserQuery(id as string);

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
      } transition-all duration-500 flex justify-between items-center z-50 max-sm:p-3`}
    >
      <div className="flex items-center gap-4 max-sm:justify-between max-sm:w-full">
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => dispatch(setSideBar(true))}
          className="w-6 h-6 hover:cursor-pointer"
        />
        <div className="text-xl font-bold">LOGO</div>
        <Link href={""} className="font-medium max-sm:hidden">
          University
        </Link>
        <Link href={""} className="font-medium max-sm:hidden">
          Documents
        </Link>
      </div>
      <div className="flex gap-4 items-center max-sm:gap-2">
        {!id || !data && !isLoading ? (
          <div className="flex gap-4 items-center max-sm:gap-2  max-sm:hidden">
            <DaButton
              fullRounded
              label="Sign In"
              className="bg-green-500 text-white max-sm:text-sm px-4 py-1"
              onClick={() => dispatch(setSignIn(true))}
              padding
            />
            <DaButton
              fullRounded
              label="Sign Up"
              className="bg-green-500 text-white max-sm:text-sm px-4 py-1"
              onClick={() => dispatch(setSignUp(true))}
              padding
            />

           
          </div>
        ) : !data && isLoading ? (
          <div>
            <NavLoader />
          </div>
        ):null}
      </div>
    </div>
  );
}

export default LandingNavBar;
