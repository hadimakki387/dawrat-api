import React from "react";

function DaCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-4 bg-white rounded-xl ${className}`}>{children}</div>;
}

export default DaCard;
