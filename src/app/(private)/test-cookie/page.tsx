"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";

type Props = {};

function CookiesTest({}: Props) {
  const cookie = Cookies.get("dawratToken");
  const [res, setRes] = useState();
  const fetcher = async () => {
    const res = await fetch("http://localhost:3000/api/test-cookie")
      .then((res) => res.json())
      .then((res) => setRes(res))
      .catch((err) => console.log(err));
  };
  const postFetcher = async () => {
    const res = await fetch("http://localhost:3000/api/test-cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cookie }),
    })
      .then((res) => res.json())
      .then((res) => setRes(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => {
          postFetcher();
        }}
      >
        postCookie
      </button>
      <button
        onClick={() => {
          fetcher();
        }}
      >
        getCookie
      </button>
      <div>{JSON.stringify(res)}</div>
    </div>
  );
}

export default CookiesTest;
