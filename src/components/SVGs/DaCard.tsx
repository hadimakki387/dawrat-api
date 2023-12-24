import { CircularProgress } from "@mui/material";
import React from "react";

function DaCard({
  children,
  className,
  loading = false,
}: {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}) {
  return (
    <div className={`p-4 bg-white rounded-xl max-md:p-2  ${className}`}>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <CircularProgress/>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export default DaCard;
