"use client";
import StoreWrapper from "@/core/StoreWrapper";
import ForgetPasswordDialog from "@/core/features/landingPage/components/ForgetPasswordDialog";
import SideBar from "@/core/features/landingPage/components/SideBar";
import SignUpDialog from "@/core/features/landingPage/components/SignUpDialog";
import SignInDialog from "@/core/features/landingPage/components/signInDialog";
import PublicAuthGuard from "./PublicAuthGuard";

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
