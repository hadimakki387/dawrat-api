import React from "react";
import { Toaster } from 'sonner';
import dynamic from "next/dynamic";

function ToastWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <Toaster richColors position="top-right" closeButton/>
    </div>
  );
}

export default dynamic(() => Promise.resolve(ToastWrapper), { ssr: false });
