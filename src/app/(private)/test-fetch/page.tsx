"use client";
import React, { useEffect } from "react";

type Props = {};

function TestFetch({}: Props) {
  const [data, setData]: any = React.useState(null);

  async function fetchData() {
    setData(null);
    const data = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    ).then((res) => res.json());
    setData(data);
  }
  async function fetchMyData() {
    setData(null);
    const data = await fetch("https://dawrat-express.netlify.app/api/user").then(
      (res) => res.json()
    );
    setData(data);
  }

  console.log(data);

  return (
    <div>
      <div>this is the title from other domain:{data?.title}</div>
      <div>this is the data from the my domein :{data?.family}</div>
      <div
        onClick={() => {
          fetchData();
        }}
        className="hover:cursor-pointer"
      >
        fetch from idk
      </div>
      <div
        onClick={() => {
          fetchMyData();
        }}
        className="hover:cursor-pointer"
      >
        fetch from my backend
      </div>
    </div>
  );
}

export default TestFetch;
