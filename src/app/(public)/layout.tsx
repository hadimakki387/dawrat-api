"use client";
import LandingNavBar from "@/components/layout/LandingNavBar";
import StoreWrapper from "@/core/StoreWrapper";
import PublicAuthGuard from "./PublicAuthGuard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StoreWrapper>
        <PublicAuthGuard>{children}</PublicAuthGuard>
      </StoreWrapper>
    </>
  );
}
