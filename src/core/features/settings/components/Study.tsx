"use client";
import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import DaButton from "@/components/global/DaButton";
import { useAppSelector } from "@/core/StoreWrapper";
import {
  useGetAllDomainsQuery,
  useGetDomainsUsingUniversityIdQuery,
} from "@/core/rtk-query/domain";
import { useGetUniversitiesQuery } from "@/core/rtk-query/universities";
import {
  useUpdateUserMutation,
  useUpdateUserUniversityMutation,
} from "@/core/rtk-query/user";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setAddDomainDialog } from "../../Upload/redux/upload-slice";

function Study() {
  const [university, setUniversity] = useState("");
  const [domain, setDomain] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [editUni, setEditUni] = useState(false);
  const [editDomain, setEditDomain] = useState(false);
  const dispatch = useDispatch();
  const { addDomainDialog } = useAppSelector((state) => state.upload);
  console.log("this is the add domain dialog", addDomainDialog);

  const { user } = useAppSelector((state) => state.global);
  const { data } = useGetUniversitiesQuery({
    title: university,
  });
  const { data: domains } = useGetAllDomainsQuery({
    title: domain,
    limit: 5,
  });
  const { data: newDomains } = useGetDomainsUsingUniversityIdQuery(
    selectedUniversity || (user?.university?.id as string)
  );
  const [submitted, setSubmitted] = useState(false);
  const [updateUniversity] = useUpdateUserUniversityMutation();
  const [updateUser] = useUpdateUserMutation();

  return (
    <div className="space-y-6 w-[25rem] max-md:w-full">
      <h2 className="text-xl text-titleText font-medium flex items-center gap-4">
        <div>Study</div>
        {(!user?.domain?.id || !user?.university?.id) && (
          <div className="w-2 h-2 bg-error rounded-full"></div>
        )}
      </h2>
      {editUni || !user?.university?.title ? (
        <div>
          <div className="mb-4">
            <div>
              <p className="text-titleText mb-2">Select University</p>

              <AutoCompleteSearch
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
                value={user?.university?.title}
              />
              {submitted && !selectedUniversity && (
                <div className="text-sm text-error">university is required</div>
              )}
              {!user?.university?.id && (
                <p className="text-error text-sm font-semibold">
                  Add Your University
                </p>
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
                const id = toast.loading("Updating...");
                updateUniversity({
                  id: user?.id,
                  body: { university: selectedUniversity },
                })
                  .unwrap()
                  .then((res) => {
                    toast.dismiss(id);
                    toast.success("Updated Successfully");
                  })
                  .catch((err) => {
                    toast.dismiss(id);
                    toast.error(`${err.data.message}`);
                  });
              }
            }}
          />
        </div>
      ) : (
        <div
          onClick={() => setEditUni(true)}
          className="hover:cursor-pointer flex flex-col"
        >
          <div>{user?.university?.title}</div>
          <div className="text-primary text-sm font-semibold">Edit</div>
        </div>
      )}
      {editDomain || !user?.domain?.id ? (
        <div>
          <div className="mb-4">
            <div>
              {user?.role === "admin" && (
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-titleText ">Select Domain</p>
                  <p
                    className="text-primary font-bold text-xs hover:cursor-pointer "
                    onClick={() => {
                      dispatch(setAddDomainDialog(true));
                    }}
                  >
                    Add Domain
                  </p>
                </div>
              )}
              <AutoCompleteSearch
                defaultValue={user?.domain?.title}
                data={newDomains || []}
                disabled={!user?.university?.id}
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
              {!user?.domain?.id && (
                <p className="text-error text-sm font-semibold">
                  Add Your Domain
                </p>
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
                const id = toast.loading("Updating...");
                updateUser({
                  id: user?.id,
                  body: { domain: selectedDomain },
                })
                  .unwrap()
                  .then((res) => {
                    toast.dismiss(id);
                    toast.success("Updated Successfully");
                  })
                  .catch((err) => {
                    toast.dismiss(id);
                    toast.error(`${err.data.message}`);
                  });
              }
            }}
          />
        </div>
      ) : (
        <div
          onClick={() => setEditDomain(true)}
          className="hover:cursor-pointer flex flex-col"
        >
          <div>{user?.domain?.title}</div>
          <div className="text-primary text-sm font-semibold">Edit</div>
        </div>
      )}
    </div>
  );
}

export default Study;
