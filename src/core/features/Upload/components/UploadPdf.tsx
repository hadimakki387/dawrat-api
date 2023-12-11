import { OurFileRouter } from "@/app/api/uploadthing/core";
import DaCard from "@/components/SVGs/DaCard";
import DaButton from "@/components/global/DaButton";
import { useAppSelector } from "@/core/StoreWrapper";
import { useGetUniversitiesQuery } from "@/core/rtk-query/universities";
import { ToastType } from "@/services/constants";
import { generateToast } from "@/services/global-function";
import { UploadDropzone } from "@uploadthing/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setHandleSubmit,
  setUploadedDocs
} from "../redux/upload-slice";
import Details from "./Details";

function UploadPdf() {
  const { searchUploadUniversity, selectedUniversity, uploadedDocs } =
    useAppSelector((state) => state.upload);
  const { data } = useGetUniversitiesQuery({
    title: searchUploadUniversity,
    limit: 5,
  });
  const dispatch = useDispatch();

  const { user } = useAppSelector((state) => state.global);
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/");
    }
  }, [user, router]);

  return (
    <DaCard
      className="flex flex-col justify-center w-3/4 m-auto gap-8 p-8"
      loading={!data}
    >
      <div className="w-full m-auto">
        <h1 className="text-3xl font-semibold text-darkText mb-4">
          Share your <span className="text-primary font-bold">PDFs</span> and
          benifit your colleague
        </h1>
        <UploadDropzone<OurFileRouter, "pdfUploader">
          endpoint="pdfUploader"
          className="ut-label:text-primary  bg-primaryBg border border-primary border-dashed py-4 hover:cursor-pointer rounded-2xl"
          appearance={{
            button:
              "ut-uploading:bg-primary bg-primary rounded-full w-full ut-uploading:w-full",
            container: "text-primary",
            uploadIcon: "text-primary",
          }}
          onUploadProgress={(progress) => {
            console.log(progress);
          }}
          onClientUploadComplete={async (res) => {
            console.log("this is the res")
            console.log(res)
            // if (res) {
            //   dispatch(setUploadedDocs(res));
            //   localStorage.setItem("uploadedDocs", JSON.stringify(res));
            //   generateToast({
            //     message: "Upload complete",
            //     toastType: ToastType.success,
            //     duration: 2000,
            //   });
            // }
          }}
          onUploadError={(error: Error) => {
            console.log(`ERROR! ${error.message}`);
          }}
          onUploadBegin={(name) => {
            console.log("Uploading: ", name);
          }}
          config={{ mode: "auto" }}
        />
      </div>
      <div className={`${uploadedDocs.length > 0 ? "" : "hidden"}`}>
        <Details />
      </div>

      <div className="flex justify-end items-center">
        <DaButton
          label="Submit"
          className="bg-primary text-white"
          onClick={() => dispatch(setHandleSubmit(Math.random()))}
        />
      </div>
    </DaCard>
  );
}

export default UploadPdf;
