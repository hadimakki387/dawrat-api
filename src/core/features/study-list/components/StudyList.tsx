"use client";
import { DocumentInterface } from "@/backend/modules/Documents/document.interface";
import DaSearch from "@/components/global/DaSearch/DaSearch";
import { useGetManyDocumentsByIdQuery } from "@/core/rtk-query/documents";
import { useGetSingleStudylistQuery } from "@/core/rtk-query/user";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CourseHeaderSkeleton from "../../courses/components/CourseHeaderSkeleton";
import DocCardSkeleton from "../../courses/components/DocCardSkeleton";
import SaveForStudyListDialog from "../../courses/components/SaveForStudyList";
import DocCard from "../../courses/components/docCard";
import StudyListHeader from "./StudyListHeader";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import MissingDataMessage from "../../HomePage/Components/MissingDataMessage";

type Props = {};

function StudyListPage({}: Props) {
  const params = useParams();
  const id = params?.id;
  const { data: studyList } = useGetSingleStudylistQuery(id as string);
  const dispatch = useDispatch();
  const { data: documents, isLoading: loadingDocuments } =
    useGetManyDocumentsByIdQuery(
      {
        body: studyList?.documents,
      },
      {
        skip: !studyList,
      }
    );
  const [search, setSearch] = useState<string>("");
  const [filteredDocuments, setFilteredDocuments] = useState<
    DocumentInterface[] | null
  >(null);

  useEffect(() => {
    if (documents) {
      if (search === "") return setFilteredDocuments(documents);
      const filteredDocs = documents.filter((doc: DocumentInterface) => {
        return doc?.title?.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredDocuments(filteredDocs);
    }
  }, [documents, search]);

  console.log(documents);
  console.log(loadingDocuments);

  return (
    <>
      <SaveForStudyListDialog />
      {studyList && documents && filteredDocuments && documents?.length > 0 ? (
        <div>
          <StudyListHeader studyList={studyList} />
          <TextFieldComponent
            placeholder="Search Docs..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className=" mt-4 w-56 max-sm:w-full"
          />
          <div>
            {filteredDocuments.map((doc: DocumentInterface) => {
              return <DocCard doc={doc} key={doc.id} />;
            })}
          </div>
        </div>
      ) : !loadingDocuments && documents?.length === 0 && studyList ? (
        <div>
          <StudyListHeader studyList={studyList} />
          <div className="mt-4">
              <MissingDataMessage message="There are no documents in this Studylist yet. Save documents to fill it!" />
          </div>
        </div>
      ) : (
        <div>
          <CourseHeaderSkeleton />
          <div className="max-md:px-4 md:px-40 mt-4">
            {Array.from(new Array(4)).map((_, index) => {
              return <DocCardSkeleton key={index} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default StudyListPage;
