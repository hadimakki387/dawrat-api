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
import {
  setHandleMultiSubmit,
  setHandleSubmit,
  setMultiUpload,
  setMultipleUploadedDocs,
  setUploadedDocs,
} from "../redux/upload-slice";
import DaCheckbox from "@/components/global/DaCheckbox";
import SingleUploadDetails from "./SingleUploadDetails";
import MultipleUploadDetails from "./MultipleUploadDetails";
import { useDeleteUploadedPdfMutation } from "@/core/rtk-query/upload";

function UploadPdf() {
  const {
    searchUploadUniversity,
    selectedUniversity,
    uploadedDocs,
    selectedCourse,
    selectedDomain,
    multiUpload,
    multipleUploadedDocs,
  } = useAppSelector((state) => state.upload);
  const { data } = useGetUniversitiesQuery({
    title: searchUploadUniversity,
    limit: 5,
  });
  const dispatch = useDispatch();

  const { user } = useAppSelector((state) => state.global);
  const router = useRouter();
  const [deleteUploadedPdf] = useDeleteUploadedPdfMutation();

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/");
    }
  }, [user, router]);
  // useEffect(()=>{

  // },[multiUpload])

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
          endpoint={!multiUpload ? "pdfUploader" : "multiplePdfUploader"}
          className="ut-label:text-primary  bg-primaryBg border border-primary border-dashed py-4 hover:cursor-pointer rounded-2xl"
          appearance={{
            button:
              "ut-uploading:bg-primary bg-primary rounded-full w-full ut-uploading:w-full",
            container: "text-primary",
            uploadIcon: "text-primary",
          }}
          onClientUploadComplete={async (res: any) => {
            if (!multiUpload) {
              const storedDocs = localStorage.getItem("uploadedDocs");
              const parsedStoredDocs = storedDocs && JSON.parse(storedDocs);
              if (uploadedDocs.length > 0 || parsedStoredDocs?.length > 0) {
                deleteUploadedPdf(
                  [uploadedDocs[0].key] || [parsedStoredDocs[0].key]
                ).then(() => {
                  dispatch(setUploadedDocs(res));
                  localStorage.setItem("uploadedDocs", JSON.stringify(res));
                  toast.success("File Uploaded Successfully");
                });
                return;
              }
              dispatch(setUploadedDocs(res));
              localStorage.setItem("uploadedDocs", JSON.stringify(res));
              toast.success("File Uploaded Successfully");
            }
            if (multiUpload) {
              dispatch(
                setMultipleUploadedDocs([...res, ...multipleUploadedDocs])
              );
              localStorage.setItem(
                "multiUploadedDocs",
                JSON.stringify([...res, ...multipleUploadedDocs])
              );
              toast.success("Files Uploaded Successfully");
            }
          }}
          onUploadError={(error: Error) => {
            toast.error(`${error?.message}`);
          }}
          onUploadBegin={(name: any) => {
            console.log("Uploading: ", name);
          }}
          config={{ mode: "auto" }}
        />
      </div>
      <div className="flex items-center justify-end gap-4">
        <p className="text-sm font-semibold">Multiple Docs Upload</p>
        <DaCheckbox
          isSwitch
          onChange={() => {
            dispatch(setMultiUpload(!multiUpload));
          }}
          checked={multiUpload}
        />
      </div>
      <div
        className={`${uploadedDocs.length > 0 && !multiUpload ? "" : "hidden"}`}
      >
        <SingleUploadDetails />
      </div>
      <div
        className={`${
          multipleUploadedDocs.length > 0 && multiUpload ? "" : "hidden"
        }`}
      >
        <MultipleUploadDetails />
      </div>

      <div className="flex justify-end items-center">
        <DaButton
          label="Submit"
          className={`bg-primary text-white ${
            !selectedUniversity?.value ||
            !selectedCourse?.value ||
            !selectedDomain?.value
              ? "hover:cursor-not-allowed"
              : ""
          }`}
          disabled={
            !selectedUniversity?.value ||
            !selectedCourse?.value ||
            !selectedDomain?.value
          }
          onClick={() => {
            if (multiUpload) {
              dispatch(setHandleMultiSubmit(Math.random()));
            } else {
              dispatch(setHandleSubmit(Math.random()));
            }
          }}
        />
      </div>
    </DaCard>
  );
}

export default UploadPdf;
