import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lazy, Suspense } from "react";

interface Props {
  doc: any;
  onClick?: () => any;
}

const LazyGetPdfThumbnail = lazy(() => import("../../pdf/GetPdfThumbnail"));

function ItemCard({ doc, onClick }: Props) {

  return (
    <div
      onClick={onClick}
      className="w-44 h-72 rounded-xl  overflow-hidden hover:bg-primaryBg transition-all duration-200 shadow-md hover:cursor-pointer"
    >
      <div className="h-1/2 rounded-xl p-2 bg-silverBg">
        <div className="w-[98%] m-auto overflow-hidden rounded-xl h-[98%]">
          <Suspense fallback={<div>Loading...</div>}>
            <LazyGetPdfThumbnail
              width={300}
              height={100}
              className="flex justify-center w-full "
              url={doc?.doc?.url}
            />
          </Suspense>
        </div>
      </div>
      <div className="h-1/2  z-10 p-2 flex flex-col justify-between">
        <p className="font-medium text-primary">{doc?.title}</p>
        <p className="text-subTitleText text-xs font-medium">
          {doc?.courseTitle}
        </p>
        <div className="flex justify-center items-center gap-2 bg-neutral-100 rounded-md py-1">
          <FontAwesomeIcon icon={faThumbsUp} className="text-green-400" />
          <p className="text-titleText text-sm font-medium">
            {!doc?.upvotes && !doc?.downvotes
              ? "0%"
              : doc?.upvotes === doc?.downvotes
              ? "100%"
              : (((doc?.upvotes)/(doc?.upvotes+doc?.downvotes)) * 100).toFixed(2) + "%"}
          </p>
          <p className="text-subTitleText text-sm">({doc?.upvotes+doc?.downvotes})</p>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
