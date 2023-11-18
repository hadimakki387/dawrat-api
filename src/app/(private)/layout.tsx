"use client";

import StoreWrapper from "@/core/StoreWrapper";
import PrivateAuthGuard from "./PrivateAuthGuard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StoreWrapper>
        <PrivateAuthGuard>{children}</PrivateAuthGuard>
      </StoreWrapper>
    </>
  );
}
