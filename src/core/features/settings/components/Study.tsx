"use client";
import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import { useGetUniversitiesQuery } from "@/core/rtk-query/universities";
import React, { useState } from "react";
import {
  setSearchSettingsUniversity,
  setSelectedSettingsUniversity,
} from "../redux/settings-slice";
import { useAppSelector } from "@/core/StoreWrapper";
import DaButton from "@/components/global/DaButton";
import { generateToast, updateToast } from "@/services/global-function";
import { ToastType } from "@/services/constants";
import { useUpdateUserUniversityMutation } from "@/core/rtk-query/user";

function Study() {
  const { searchSettingsUniversity, selectedSettingsUniversity } =
    useAppSelector((state) => state.settings);
  const { user } = useAppSelector((state) => state.global);
  const { data } = useGetUniversitiesQuery({
    title: searchSettingsUniversity,
    limit: 5,
  });
  const [submitted, setSubmitted] = useState(false);
  const [updateUniversity] = useUpdateUserUniversityMutation();

  return (
    <div className="space-y-6 w-[25rem]">
      <h2 className="text-xl text-titleText font-medium">Study</h2>
      <div className="mb-4">
        <p className="text-titleText mb-2">Selet University</p>
        <AutoCompleteSearch
          defaultValue={user?.university?.title}
          data={data}
          placeholder="Search for your university"
          setSearch={setSearchSettingsUniversity}
          setSelectedItem={setSelectedSettingsUniversity}
          style={{ borderRadius: "0.7rem" }}
          className="mr-4 p-1"
          name="university"
        />
        {submitted && !selectedSettingsUniversity && (
          <div className="text-sm text-error">university is required</div>
        )}
      </div>
      <DaButton
        label="Submit"
        className="bg-primary text-white font-semibold w-full"
        fullRounded
        onClick={() => {
          setSubmitted(true);
          if (selectedSettingsUniversity) {
            console.log("uploaded");
            const id = generateToast({
              message: "Updating...",
              toastType: ToastType.default,
              isLoading: true,
            });
            updateUniversity({
              id: user?.id,
              body: { university: selectedSettingsUniversity },
            })
              .unwrap()
              .then((res) => {
                updateToast(id, "Updated Successfully", {
                  toastType: ToastType.success,
                  isLoading: false,
                  duration: 2000,
                });
              })
              .catch((err) => {
                updateToast(id, `${err.data.message}`, {
                  toastType: ToastType.error,
                  isLoading: false,
                  duration: 2000,
                });
              });
          }
        }}
      />
    </div>
  );
}

export default Study;
