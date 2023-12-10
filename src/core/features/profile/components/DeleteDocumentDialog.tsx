"use client";
import DaButton from "@/components/global/DaButton";
import DaDialog from "@/components/global/DaDialog";
import { useAppSelector } from "@/core/StoreWrapper";
import React from "react";
import { useDispatch } from "react-redux";
import { setDeleteDocumentDialog } from "../redux/profile-slice";
import { useDeleteUploadedPdfMutation } from "@/core/rtk-query/upload";
import { useDeleteDocumentMutation } from "@/core/rtk-query/documents";
import { generateToast, updateToast } from "@/services/global-function";
import { ToastType } from "@/services/constants";
import { setUser } from "../../global/redux/global-slice";

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
        <div className="text-xl text-titleText font-medium">
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
                const id = generateToast({
                  message: "Deleting...",
                  toastType: ToastType.default,
                  isLoading: true,
                });
                deleteDocument({
                  id: selectedDoc?.id,
                  body: [selectedDoc?.doc?.key],
                  ownerId: selectedDoc?.ownerId,
                })
                  .unwrap()
                  .then((res) => {
                    updateToast(id, "Deleted", {
                      toastType: ToastType.success,
                      isLoading: false,
                    });
                    dispatch(setDeleteDocumentDialog(false));
                    dispatch(
                      setUser({
                        uploads: user?.uploads && user?.uploads - 1,
                        ...user,
                      })
                    );
                  })
                  .catch((err) => {
                    updateToast(id, err.data?.message, {
                      toastType: ToastType.error,
                      isLoading: false,
                    });
                    dispatch(setDeleteDocumentDialog(false));
                  });
              } else {
                generateToast({
                  message: "No Selected Document",
                  toastType: ToastType.error,
                  isLoading: false,
                });
              }
            }}
          />
        </div>
      </div>
    </DaDialog>
  );
}

export default DeleteDocumentDialog;
