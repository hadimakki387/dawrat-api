import DaCarousel from "@/components/global/carousel/DaCarousel";
import React from "react";
import ItemCard from "../../HomePage/Components/ItemCard";
import { DocumentInterface } from "@/backend/modules/Documents/document.interface";
import { DocumentI } from "@/services/types";
import MissingDataMessage from "../../HomePage/Components/MissingDataMessage";

type Props = {
  docs: DocumentI[];
  onClick?: (id: string) => any;
};

function PopularDocuments({ docs, onClick }: Props) {
  return (
    <div>
      <p className="text-xl font-medium text-titleText mb-4">
        Popular Documents
      </p>
      {docs?.length > 0 ? (
        <DaCarousel hasButtons={false}>
          {docs.map((doc, index) => {
            return (
              <ItemCard
                doc={doc}
                key={index}
                onClick={() => {
                  if (onClick) onClick(doc?.id);
                }}
              />
            );
          })}
        </DaCarousel>
      ) : (
        <MissingDataMessage message="No popular documents yet" />
      )}
    </div>
  );
}

export default PopularDocuments;
