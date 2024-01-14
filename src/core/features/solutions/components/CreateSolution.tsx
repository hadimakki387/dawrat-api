"use client"
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setHandleSolutionSubmit, setUploadedSolutions } from "../redux/solutions-slice";
import CreateSolutionDetails from "./CreateSolutionDetails";
import DaCard from "@/components/SVGs/DaCard";
import { useAppSelector } from "@/core/StoreWrapper";
import DaButton from "@/components/global/DaButton";

type Props = {};

function CreateSolution({}: Props) {
  const dispatch = useDispatch();
  const {uploadedSoutions} = useAppSelector(state=>state.solutions)
  return (
    <DaCard
      className="flex flex-col justify-center w-3/4 m-auto gap-8 p-8  max-md:w-full max-md:p-2"
    >
      <div className="w-full m-auto">
        <h1 className="text-3xl font-semibold text-darkText mb-4 max-md:text-xl">
          Share your <span className="text-primary font-bold">PDFs</span> and
          benifit your colleague
        </h1>
        <UploadDropzone<OurFileRouter>
          endpoint="pdfUploader"
          className="ut-label:text-primary  bg-primaryBg border border-primary border-dashed py-4 hover:cursor-pointer rounded-2xl"
          appearance={{
            button:
              "ut-uploading:bg-primary bg-primary rounded-full w-full ut-uploading:w-full",
            container: "text-primary",
            uploadIcon: "text-primary",
          }}
          onClientUploadComplete={async (res: any) => {
            if (res) {
              dispatch(setUploadedSolutions(res));
              localStorage.setItem("uploadedDocs", JSON.stringify(res));
            }
          }}
          onUploadError={(error: Error) => {
            toast.error(`${error?.message}`)
          }}
          onUploadBegin={(name: any) => {
            console.log("Uploading: ", name);
          }}
          config={{ mode: "auto" }}
        />
      </div>
      <div className={`${uploadedSoutions.length > 0 ? "" : "hidden"}`}>
        <CreateSolutionDetails />
      </div>

      <div className="flex justify-end items-center">
        <DaButton
          label="Submit"
          className={`bg-primary text-white `}
          onClick={() => dispatch(setHandleSolutionSubmit(Math.random()))}
        />
      </div>
    </DaCard>
  );
}

export default CreateSolution;
