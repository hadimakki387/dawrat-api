"use client";
import { DocumentInterface } from "@/backend/modules/Documents/document.interface";
import TabsSwitch from "@/components/global/TabsSwitch";
import { useGetDocumentsByCourseIdQuery } from "@/core/rtk-query/documents";
import { useParams } from "next/navigation";
import React from "react";
import CourseHeader from "./CourseHeader";
import DocCardSkeleton from "./DocCardSkeleton";
import DocCard from "./docCard";
import SaveForStudyListDialog from "./SaveForStudyList";

function Courses() {
  const [value, setValue] = React.useState(0);
  const params = useParams();
  const id = params?.id;

  const { data, isLoading } = useGetDocumentsByCourseIdQuery({
    id: id,
    sort: value ? "rating" : "date",
  });

  return (
    <div className="md:mr-6">
      <CourseHeader />
      <SaveForStudyListDialog/>
      <div className="md:px-40 mt-8">
        <h1 className="text-xl font-bold text-darkText">Documents</h1>
        <div>
          <TabsSwitch
            tabs={["Date", "Rating"]}
            value={value}
            onChange={(e) => {
              setValue(e as number);
            }}
            sx={{
              fontSize: 14,
              fontWeight: "bold",
              color: "var(--green-text)",
              ".MuiTabs-indicator": {
                backgroundColor: "var(--green-text)",
                borderRadius: 10,
              },
            }}
          />
         

          {isLoading ? (
            Array(5)
              .fill(3)
              .map((_, i) => {
                return <DocCardSkeleton key={i} />;
              })
          ) : data && data.length > 0 ? (
            data?.map((doc: DocumentInterface) => {
              return <>{doc?.doc?.url && <DocCard key={doc.id} doc={doc} />}</>;
            })
          ) : (
            <div className="text-center text-darkText mt-8 font-medium">No documents found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;
