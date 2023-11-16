import React from "react";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";

function ToastWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default dynamic(() => Promise.resolve(ToastWrapper), { ssr: false });
