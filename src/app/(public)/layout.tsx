"use client";
import LandingNavBar from "@/components/layout/LandingNavBar";
import StoreWrapper from "@/core/StoreWrapper";
import PublicAuthGuard from "./PublicAuthGuard";
import SideBar from "@/core/features/landingPage/components/SideBar";
import SignInDialog from "@/core/features/landingPage/components/signInDialog";
import SignUpDialog from "@/core/features/landingPage/components/SignUpDialog";
import ForgetPasswordDialog from "@/core/features/landingPage/components/ForgetPasswordDialog";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StoreWrapper>
        <PublicAuthGuard>
          <SideBar />
          <SignInDialog />
          <SignUpDialog />
          <ForgetPasswordDialog />
          {children}
        </PublicAuthGuard>
      </StoreWrapper>
    </>
  );
}
