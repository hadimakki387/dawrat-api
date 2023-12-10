"use client";

import StoreWrapper from "@/core/StoreWrapper";
import HomeNavBar from "../../components/layout/HomeNavBar";
import PrivateAuthGuard from "./PrivateAuthGuard";
import { SideBar } from "@/components/reactsideBar/SideBar.tsx";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StoreWrapper>
        <PrivateAuthGuard>
          
          <HomeNavBar />
          <SideBar />
          <div className="ml-[15vw]  px-4 pt-[10vh] max-md:ml-0">
            <div className="mt-6 ml-8 max-md:ml-0">{children}</div>
          </div>
        </PrivateAuthGuard>
      </StoreWrapper>
    </>
  );
}
