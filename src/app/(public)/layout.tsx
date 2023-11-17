"use client"
import LandingNavBar from "@/components/layout/LandingNavBar";
import PublicAuthGuard from "./PublicAuthGuard";
import { Provider } from "react-redux";
import StoreWrapper, { store } from "@/core/StoreWrapper";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LandingNavBar />
        <StoreWrapper>
          <PublicAuthGuard>{children}</PublicAuthGuard>
        </StoreWrapper>
      </body>
    </html>
  );
}
