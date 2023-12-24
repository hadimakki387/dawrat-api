"use client";
import DaCarousel from "@/components/global/carousel/DaCarousel";
import { useAppSelector } from "@/core/StoreWrapper";
import { useGetManyDocumentsByIdQuery } from "@/core/rtk-query/documents";
import { useRouter } from "next/navigation";
import ItemCard from "./ItemCard";
import MissingDataMessage from "./MissingDataMessage";
import ItemCardLoadingSkeleton from "./skeletons/ItemCardLoadingSkeleton";

function MyRecentDocument() {
  const { user } = useAppSelector((state) => state.global);
  const { data: reviewedDocuments } = useGetManyDocumentsByIdQuery(
    { body: user?.reviewedDocuments },
    {
      skip: !user,
    }
  );
  const router = useRouter();

  return (
    <div className="space-y-1">
      <h1 className="text-darkText font-bold text-2xl tracking-wide ">
        Continue Reading
      </h1>
      {reviewedDocuments && reviewedDocuments.length === 0 && (
        <MissingDataMessage
          message="You are not following any courses yet. Use the search bar to find
        your courses and follow them."
        />
      )}

      <div className="">
        {reviewedDocuments ? (
          <DaCarousel
            hasButtons={false}
            options={{ containScroll: "trimSnaps" }}
          >
            {reviewedDocuments.map((doc: any, index: any) => {
              return (
                <ItemCard
                  onClick={() => router.push(`/pdf/${doc?.id}`)}
                  doc={doc}
                  key={index}
                />
              );
            })}
          </DaCarousel>
        ) : (
          <div className="flex items-center gap-4">
            {Array.from(new Array(4)).map((_, index) => (
              <ItemCardLoadingSkeleton key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRecentDocument;
