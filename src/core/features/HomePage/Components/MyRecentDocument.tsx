"use client";
import { useAppSelector } from "@/core/StoreWrapper";
import { useGetManyDocumentsByIdQuery } from "@/core/rtk-query/documents";
import ItemCard from "./ItemCard";
import { useRouter } from "next/navigation";
import DaLoader from "@/components/global/DaLoader";
import { Skeleton } from "@mui/material";
import ItemCardLoadingSkeleton from "./skeletons/ItemCardLoadingSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import MissingDataMessage from "./missingDataMessage";

function MyRecentDocument() {
  const { user } = useAppSelector((state) => state.global);
  const { data: reviewedDocuments } = useGetManyDocumentsByIdQuery(
    { body: user?.reviewedDocuments },
    {
      skip: !user,
    }
  );
  const router = useRouter();

  console.log(reviewedDocuments);
  return (
    <div className="space-y-1">
      <h1 className="text-darkText font-bold text-2xl tracking-wide ">
        Recently Reviewed Documents
      </h1>
      {reviewedDocuments && reviewedDocuments.length === 0 && (
        <MissingDataMessage
          message="You are not following any courses yet. Use the search bar to find
        your courses and follow them."
        />
      )}

      <div className="w-full flex items-center gap-4">
        {reviewedDocuments
          ? reviewedDocuments.map((doc: any, index: any) => {
              return (
                <ItemCard
                  onClick={() => router.push(`/pdf/${doc?.id}`)}
                  doc={doc}
                  key={index}
                />
              );
            })
          : Array.from(new Array(4)).map((_, index) => (
              <ItemCardLoadingSkeleton key={index} />
            ))}
      </div>
    </div>
  );
}

export default MyRecentDocument;
