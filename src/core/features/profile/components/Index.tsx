"use client";
import { useAppSelector } from "@/core/StoreWrapper";
import React from "react";
import { useDispatch } from "react-redux";
import { setName } from "../redux/profile-slice";
import { useLoginUserMutation } from "@/core/rtk-query/auth/login";

function Index() {
  const { name } = useAppSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [login,{data,error}] = useLoginUserMutation()
  return (
    <div className="flex flex-col bg-white">
      <div>{`this is the name ${name}`}{" "}</div>
      <button
        onClick={() => {
          dispatch(setName("ja3fusta"));
        }}
        className="bg-white"
      >
        click to change name{" "}
      </button>
      <button onClick={()=>login({data:{email:"hello@gmai.com",password:"password"}})}>
        click me to post data
      </button>
    </div>
  );
}

export default Index;
