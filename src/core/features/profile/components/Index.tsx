"use client";
import { useAppSelector } from "@/core/StoreWrapper";
import React from "react";
import { useDispatch } from "react-redux";
import { setName } from "../redux/profile-slice";
import { useLoginUserMutation } from "@/core/rtk-query/auth/login";
import { useRegisterUserMutation } from "@/core/rtk-query/auth/register";

function Index() {
  const { name } = useAppSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [login] = useLoginUserMutation();
  const [register] = useRegisterUserMutation();
  return (
    <div className="flex flex-col bg-white">
      <div>{`this is the name ${name}`} </div>
      <button
        onClick={() => {
          dispatch(setName("ja3fusta"));
        }}
        className="bg-white"
      >
        click to change name{" "}
      </button>

      <button
        onClick={() =>
          login({
            data: {
              email: "hmakki387@gmail.com",
              password: "password1",
            },
          })
        }
      >
        click me to post data
      </button>
    </div>
  );
}

export default Index;
