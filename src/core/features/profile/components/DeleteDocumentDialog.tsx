"use client";
import DaButton from "@/components/global/DaButton";
import DaDialog from "@/components/global/DaDialog";
import { useAppSelector } from "@/core/StoreWrapper";
import React from "react";
import { useDispatch } from "react-redux";
import { setDeleteDocumentDialog } from "../redux/profile-slice";
import { useDeleteUploadedPdfMutation } from "@/core/rtk-query/upload";

function DeleteDocumentDialog() {
  const { deleteDocumentDialog, selectedDoc } = useAppSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();
  const [] = useDeleteUploadedPdfMutation()

  return (
    <DaDialog open={deleteDocumentDialog}>
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
                color:"var(--primary)"
            }}
          />
          <DaButton
            label="Delete"
            className="bg-error text-white"
            onClick={() => {

              dispatch(setDeleteDocumentDialog(false));
            }}
          />
        </div>
      </div>
    </DaDialog>
  );
}

export default DeleteDocumentDialog;
