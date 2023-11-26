import AutoCompleteSearch from "@/components/global/AutoCompleteSearch";
import { useAppSelector } from "@/core/StoreWrapper";
import React from "react";
import {
  setSearchUploadUniversity,
  setSelectedUniversity,
} from "../redux/upload-slice";
import { useGetUniversitiesQuery } from "@/core/rtk-query/universities";
import Institution from "@/components/SVGs/Institution";
import DaCard from "@/components/SVGs/DaCard";
import Document from "@/components/SVGs/Document";
import Convert from "convert-units";

function Details() {
  const { searchUploadUniversity, selectedUniversity, uploadedDocs } =
    useAppSelector((state) => state.upload);
  const { data } = useGetUniversitiesQuery({
    title: searchUploadUniversity,
    limit: 5,
  });
  console.log("this isthe updated docs");
  console.log(uploadedDocs);
  const storedDocs = localStorage.getItem("uploadedDocs");
  const parsedStoredDocs = storedDocs ? JSON.parse(storedDocs) : null;
  return (
    <div className="border border-neutral-300 rounded-2xl p-8 flex flex-col  gap-4">
      {uploadedDocs
        ? uploadedDocs.map((doc, index) => {
            return (
              <div className="flex items-center gap-2 " key={index}>
                <div>
                  <Document
                    fill="var(--icon-bg)"
                    patternFill="var(--primary)"
                    width="40px"
                    height="40px"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div className="text-darkText">{doc.name}</div>
                  <div className="text-xs text-subTitleText">
                    {Convert(doc.size).from("B").to("MB").toFixed(2)} MB{" "}
                  </div>
                </div>
              </div>
            );
          })
        : parsedStoredDocs
        ? parsedStoredDocs.map((doc: any, index: any) => {
            return (
              <div className="flex items-center gap-2 " key={index}>
                <div>
                  <Document
                    fill="var(--icon-bg)"
                    patternFill="var(--primary)"
                    width="40px"
                    height="40px"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div className="text-darkText">{doc.name}</div>
                  <div className="text-xs text-subTitleText">
                    {Convert(doc.size).from("B").to("MB").toFixed(2)} MB{" "}
                  </div>
                </div>
              </div>
            );
          })
        : null}
      <div className="w-full h-[1px] bg-neutral-400"></div>
      <div className="w-full">
        <div className="flex items-center w-full">
          <div className="w-[15vw] flex items-center gap-4">
            <Institution
              fill="var(--sub-title-text)"
              upperFill="var(--title-text)"
              width="20px"
              height="20px"
            />
            <p>University</p>
          </div>
          <div className="w-full">
            <AutoCompleteSearch
              data={data}
              placeholder="Search for your university"
              setSearch={setSearchUploadUniversity}
              setSelectedItem={setSelectedUniversity}
              style={{ borderRadius: "0.7rem" }}
              className="w-1/2 p-1"
            />
          </div>
          <div
            className="text-sm text-primary w-32 hover:cursor-pointer"
            onClick={() => console.log("clicked")}
          >
            Add University
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
