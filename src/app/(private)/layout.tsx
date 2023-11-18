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
          <SideBar/>
          <div className="mx-6">{children}</div>
        </PrivateAuthGuard>
      </StoreWrapper>
    </>
  );
}
