"use client";
import { useAppSelector } from "@/core/StoreWrapper";
import {
  useGetRecommendedDocumentsInDomainQuery,
  useUpdateReviewedDocumentsMutation,
} from "@/core/rtk-query/documents";
import { DocumentI } from "@/services/types";
import { useRouter } from "next/navigation";
import ItemCard from "./ItemCard";
import MissingDataMessage from "./MissingDataMessage";
import ItemCardLoadingSkeleton from "./skeletons/ItemCardLoadingSkeleton";
import DaCarousel from "@/components/global/carousel/DaCarousel";

function RecommendedDocs() {
  const { user } = useAppSelector((state) => state.global);
  const { data: recommendedDocuments, isLoading: loadingDocuments } =
    useGetRecommendedDocumentsInDomainQuery(user?.domain?.id as string, {
      skip: !user,
    });
  const [updateReviewed] = useUpdateReviewedDocumentsMutation();
  const router = useRouter();

  return (
    <div className="space-y-1">
      <h1 className="text-darkText font-bold text-xl md:text-2xl tracking-wide ">
        Recommended Documents For You
      </h1>

      <div>
        {recommendedDocuments &&
        recommendedDocuments.length > 0 &&
        !loadingDocuments ? (
          <DaCarousel
            hasButtons={false}
            options={{ containScroll: "trimSnaps" }}
          >
            {recommendedDocuments?.map((doc: DocumentI, index: any) => {
              return (
                <ItemCard
                  doc={doc}
                  key={index}
                  onClick={() => {
                    router.push(`/pdf/${doc?.id}`);
                    updateReviewed({
                      id: user?.id,
                      body: { document: doc?.id },
                    });
                  }}
                />
              );
            })}
          </DaCarousel>
        ) : recommendedDocuments &&
          recommendedDocuments.length === 0 &&
          !loadingDocuments ? (
          <MissingDataMessage message="You are not following any courses yet. Use the search bar to find your courses and follow them." />
        ) : (
          <div className="flex items-center gap-3">
            <DaCarousel
              hasButtons={false}
              options={{ containScroll: "trimSnaps" }}
            >
              {Array.from(new Array(10)).map((_, index) => {
                return <ItemCardLoadingSkeleton key={index} />;
              })}
            </DaCarousel>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecommendedDocs;
