"use client";
import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import { useGetUniversitiesQuery } from "@/core/rtk-query/universities";
import React, { useState } from "react";
import {
  setSearchSettingsDomain,
  setSearchSettingsUniversity,
  setSelectedSettingsDomain,
  setSelectedSettingsUniversity,
} from "../redux/settings-slice";
import { useAppSelector } from "@/core/StoreWrapper";
import DaButton from "@/components/global/DaButton";
import { generateToast, updateToast } from "@/services/global-function";
import { ToastType } from "@/services/constants";
import { useUpdateUserMutation, useUpdateUserUniversityMutation } from "@/core/rtk-query/user";
import { useGetAllDomainsQuery } from "@/core/rtk-query/domain";

function Study() {
  const {
    searchSettingsUniversity,
    selectedSettingsUniversity,
    searchSettingsDomain,
    selectedSettingsDomain,
  } = useAppSelector((state) => state.settings);
  const { user } = useAppSelector((state) => state.global);
  const { data } = useGetUniversitiesQuery({
    title: searchSettingsUniversity,
    limit: 5,
  });
  const {data:domains} = useGetAllDomainsQuery({title: searchSettingsDomain, limit: 5})
  const [submitted, setSubmitted] = useState(false);
  const [updateUniversity] = useUpdateUserUniversityMutation();
  const[updateUser] = useUpdateUserMutation();

  return (
    <div className="space-y-6 w-[25rem]">
      <h2 className="text-xl text-titleText font-medium flex items-center gap-4">
        <div>Study</div>
        {(!user?.domain || !user?.university) && (
          <div className="w-2 h-2 bg-error rounded-full"></div>
        )}
      </h2>
      <div>
        <div className="mb-4">
          <div>
            <p className="text-titleText mb-2">Selet University</p>
            <AutoCompleteSearch
              defaultValue={user?.university?.title}
              data={data || []}
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
        </div>
        <DaButton
          label="Submit"
          className="bg-primary text-white font-semibold w-full"
          fullRounded
          onClick={() => {
            setSubmitted(true);
            if (selectedSettingsUniversity) {
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
      <div>
        <div className="mb-4">
          <div>
            <p className="text-titleText mb-2">Selet Domain</p>
            <AutoCompleteSearch
              defaultValue={user?.university?.title}
              data={domains || []}
              placeholder="Search for your Domain"
              setSearch={setSearchSettingsDomain}
              setSelectedItem={setSelectedSettingsDomain}
              style={{ borderRadius: "0.7rem" }}
              className="mr-4 p-1"
              name="university"
            />
            {submitted && !selectedSettingsDomain && (
              <div className="text-sm text-error">Domain is required</div>
            )}
          </div>
        </div>
        <DaButton
          label="Submit"
          className="bg-primary text-white font-semibold w-full"
          fullRounded
          onClick={() => {
            setSubmitted(true);
            if (selectedSettingsDomain) {
              const id = generateToast({
                message: "Updating...",
                toastType: ToastType.default,
                isLoading: true,
              });
              updateUser({
                id: user?.id,
                body: { domain: selectedSettingsDomain },
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
    </div>
  );
}

export default Study;
