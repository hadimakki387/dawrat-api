"use client";
import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import {
  useGetUniversitiesQuery,
  useGetUniversityByIdQuery,
} from "@/core/rtk-query/universities";
import React, { useState } from "react";
import { useAppSelector } from "@/core/StoreWrapper";
import DaButton from "@/components/global/DaButton";
import { generateToast, updateToast } from "@/services/global-function";
import { ToastType } from "@/services/constants";
import {
  useUpdateUserMutation,
  useUpdateUserUniversityMutation,
} from "@/core/rtk-query/user";
import {
  useGetAllDomainsQuery,
  useGetDomainByIdQuery,
} from "@/core/rtk-query/domain";

function Study() {
  const [university, setUniversity] = useState("");
  const [domain, setDomain] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");

  const { user } = useAppSelector((state) => state.global);
  const { data } = useGetUniversitiesQuery({
    title: university,
    limit: 5,
  });
  const { data: domains } = useGetAllDomainsQuery({
    title: domain,
    limit: 5,
  });
  const [submitted, setSubmitted] = useState(false);
  const [updateUniversity] = useUpdateUserUniversityMutation();
  const [updateUser] = useUpdateUserMutation();

  return (
    <div className="space-y-6 w-[25rem] max-md:w-full">
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
              setSearch={(search) => {
                setUniversity(search);
              }}
              setSelectedItem={(selectedItem) => {
                setSelectedUniversity(selectedItem);
              }}
              style={{ borderRadius: "0.7rem" }}
              className="mr-4 p-1"
              name="university"
            />
            {submitted && !selectedUniversity && (
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
            if (selectedUniversity) {
              const id = generateToast({
                message: "Updating...",
                toastType: ToastType.default,
                isLoading: true,
              });
              updateUniversity({
                id: user?.id,
                body: { university: selectedUniversity },
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
              defaultValue={user?.domain?.title}
              data={domains || []}
              disabled={!user?.domain?.title||!user?.university?.title}
              placeholder="Search for your Domain"
              setSearch={(search) => setDomain(search)}
              setSelectedItem={(selectedItem) => {
                setSelectedDomain(selectedItem);
              }}
              style={{ borderRadius: "0.7rem" }}
              className="mr-4 p-1"
              name="university"
            />
            {submitted && !selectedDomain && (
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
            if (selectedDomain) {
              const id = generateToast({
                message: "Updating...",
                toastType: ToastType.default,
                isLoading: true,
              });
              updateUser({
                id: user?.id,
                body: { domain: selectedDomain },
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
