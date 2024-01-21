"use client";
import DaButton from "@/components/global/DaButton";
import DaDialog from "@/components/global/DaDialog";
import { useAppSelector } from "@/core/StoreWrapper";
import { useDeleteDocumentMutation } from "@/core/rtk-query/documents";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setUser } from "../../global/redux/global-slice";
import { setDeleteDocumentDialog } from "../redux/profile-slice";

function DeleteDocumentDialog() {
  const { deleteDocumentDialog, selectedDoc } = useAppSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();
  const [deleteDocument] = useDeleteDocumentMutation();
  const { user } = useAppSelector((state) => state.global);

  return (
    <DaDialog
      open={deleteDocumentDialog}
      onClose={() => {
        dispatch(setDeleteDocumentDialog(false));
      }}
    >
      <div className="space-y-8">
        <div className="md:text-xl text-titleText font-medium">
          Are You Sure You Want To Delete This Document?
        </div>
        <div className="flex justify-end items-center gap-4">
          <DaButton
            label="Cancel"
            className="border border-primary text-primary font-medium"
            onClick={() => {
              dispatch(setDeleteDocumentDialog(false));
            }}
            style={{
              color: "var(--primary)",
            }}
          />
          <DaButton
            label="Delete"
            className="bg-error text-white"
            onClick={() => {
              if (selectedDoc?.id && selectedDoc?.doc?.url) {
                const id = toast.loading("Deleting Document...");
                deleteDocument({
                  id: selectedDoc?.id,
                  body: [selectedDoc?.doc?.key],
                  ownerId: selectedDoc?.ownerId,
                })
                  .unwrap()
                  .then((res) => {
                    toast.dismiss(id);
                    toast.success("Document Deleted");
                    dispatch(setDeleteDocumentDialog(false));
                    dispatch(
                      setUser({
                        uploads: res?.updatedUser?.uploads,
                        ...user,
                      })
                    );
                  })
                  .catch((err) => {
                    toast.dismiss(id);
                    toast.error(`${err?.data?.message}`);
                    dispatch(setDeleteDocumentDialog(false));
                  });
              } else {
                toast.error("Something went wrong");
              }
            }}
          />
        </div>
      </div>
    </DaDialog>
  );
}

export default DeleteDocumentDialog;
