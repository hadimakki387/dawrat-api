import { OurFileRouter } from "@/app/api/uploadthing/core";
import DaCard from "@/components/SVGs/DaCard";
import DaButton from "@/components/global/DaButton";
import { useAppSelector } from "@/core/StoreWrapper";
import { useGetUniversitiesQuery } from "@/core/rtk-query/universities";
import { UploadDropzone } from "@uploadthing/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setHandleSubmit, setUploadedDocs } from "../redux/upload-slice";
import Details from "./Details";

function UploadPdf() {
  const {
    searchUploadUniversity,
    selectedUniversity,
    uploadedDocs,
    selectedCourse,
    selectedDomain,
  } = useAppSelector((state) => state.upload);
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
      className="flex flex-col justify-center w-3/4 m-auto gap-8 p-8  max-md:w-full max-md:p-2"
      loading={!data}
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
              dispatch(setUploadedDocs(res));
              localStorage.setItem("uploadedDocs", JSON.stringify(res));
              toast.success("File Uploaded Successfully");
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
      <div className={`${uploadedDocs.length > 0 ? "" : "hidden"}`}>
        <Details />
      </div>

      <div className="flex justify-end items-center">
        <DaButton
          label="Submit"
          className={`bg-primary text-white ${
            !selectedUniversity || !selectedCourse || !selectedDomain
              ? "hover:cursor-not-allowed"
              : ""
          }`}
          disabled={
            !selectedUniversity || !selectedCourse || !selectedDomain
          }
          onClick={() => dispatch(setHandleSubmit(Math.random()))}
        />
      </div>
    </DaCard>
  );
}

export default UploadPdf;
