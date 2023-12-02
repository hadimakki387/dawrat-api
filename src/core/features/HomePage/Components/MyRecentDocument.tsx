"use client";
import { useAppSelector } from "@/core/StoreWrapper";
import { useGetManyDocumentsByIdQuery } from "@/core/rtk-query/documents";
import ItemCard from "./ItemCard";
import { useRouter } from "next/navigation";
import DaLoader from "@/components/global/DaLoader";
import { Skeleton } from "@mui/material";
import ItemCardLoadingSkeleton from "./skeletons/ItemCardLoadingSkeleton"

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
        My Recent Documents
      </h1>
      {/* <div className="flex items-center gap-4 bg-primaryBg p-4 text-primary rounded-lg">
        <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-lg">
          <div className="bg-white w-4 h-4 flex items-center justify-center rounded-lg">
            <FontAwesomeIcon
              icon={faExclamation}
              className="text-primary text-sm"
            />
          </div>
        </div>
        <p className="text-darkText">
          You are not following any courses yet. Use the search bar to find your
          courses and follow them.
        </p>
      </div> */}

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
