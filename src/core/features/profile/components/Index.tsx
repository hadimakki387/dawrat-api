"use client";
import { useAppSelector } from "@/core/StoreWrapper";
import React from "react";
import { useDispatch } from "react-redux";
import { setName } from "../redux/profile-slice";
import { useLoginMutation, useRegisterMutation } from "@/core/rtk-query/landingPage";


function Index() {
  const { name } = useAppSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
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
