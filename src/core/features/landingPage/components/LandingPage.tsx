"use client";

import { generateToast } from "@/services/global-function";
import Header from "./Header";
import ItemsSection from "./ItemsSection";
import SignUpDialog from "./SignUpDialog";
import SignInDialog from "./signInDialog";
import { ToastType } from "@/services/constants";

function LandingPage() {
  
  return (
    <div className="overflow-hidden">
      <SignInDialog />
      <SignUpDialog/>
      <Header />
      <ItemsSection />
      
    </div>
  );
}

export default LandingPage;
