import { OurFileRouter } from "@/app/api/uploadthing/core";
import CIStepper from "@/components/global/DaStepper";
import { UploadDropzone } from "@uploadthing/react";
import React from "react";
import Step2 from "./Step2";
import Step1 from "./Step1";

function UploadPdf() {
  const stepTitles = ["Personal", "Identify Verification"];
  const stepDescription = ["Personal Information", "verify Identity"];
  const steps = [Step1, Step2];
  return (
    <div>
   
      <UploadDropzone<OurFileRouter, "pdfUploader">
        
        endpoint="pdfUploader"
        className="ut-label:text-primary  bg-primaryBg border border-primary border-dashed py-4"
        appearance={{
            button:"ut-uploading:bg-primary bg-primary rounded-full w-full ut-uploading:w-full",
            container:"text-primary",
            uploadIcon:"text-primary",
          
        }}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          
        }}
        onUploadError={(error: Error) => {
          console.log(`ERROR! ${error.message}`);
        }}
        onUploadBegin={(name) => {
          // Do something once upload begins
          console.log("Uploading: ", name);
        }}
      />
    </div>
  );
}

export default UploadPdf;
