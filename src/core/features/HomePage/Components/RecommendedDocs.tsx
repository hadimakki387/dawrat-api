"use client";
import { useAppSelector } from "@/core/StoreWrapper";
import { useGetRecommendedDocumentsInDomainQuery } from "@/core/rtk-query/documents";
import { DocumentI } from "@/services/types";
import ItemCard from "./ItemCard";
import ItemCardLoadingSkeleton from "./skeletons/ItemCardLoadingSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

function RecommendedDocs() {
  const { user } = useAppSelector((state) => state.global);
  const { data: recommendedDocuments } =
    useGetRecommendedDocumentsInDomainQuery(user?.domain as string, {
      skip: !user,
    });
  console.log(user?.domain);
  return (
    <div className="space-y-1">
      <h1 className="text-darkText font-bold text-2xl tracking-wide ">
        Recommended Documents
      </h1>
      {recommendedDocuments && recommendedDocuments.length === 0 && (
        <div className="flex items-center gap-4 bg-primaryBg p-4 text-primary rounded-lg">
          <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-lg">
            <div className="bg-white w-4 h-4 flex items-center justify-center rounded-lg">
              <FontAwesomeIcon
                icon={faExclamation}
                className="text-primary text-sm"
              />
            </div>
          </div>
          <p className="text-darkText">
            You are not following any courses yet. Use the search bar to find
            your courses and follow them.
          </p>
        </div>
      )}
      {/* */}
      <div className="w-full flex items-center gap-4">
        {recommendedDocuments
          ? recommendedDocuments?.map((doc: DocumentI, index: any) => {
              return <ItemCard doc={doc} key={index} />;
            })
          : Array.from(new Array(4)).map((_, index) => {
              return <ItemCardLoadingSkeleton key={index} />;
            })}
      </div>
    </div>
  );
}

export default RecommendedDocs;
