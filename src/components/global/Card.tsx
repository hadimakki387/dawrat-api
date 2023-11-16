import React from "react";

interface Props {
  children: React.ReactNode;
  bg?: string;
  rounded?: boolean;
  className?: string;
}

function Card({ children, bg = "bg-white", rounded = true, className }: Props) {
  return (
    <div className={`p-4 relative ${bg} ${rounded && "rounded-md"}`}>{children}</div>
  );
}

export default Card;
