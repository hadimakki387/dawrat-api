import DaCarousel from "@/components/global/carousel/DaCarousel";
import React from "react";
import ItemCard from "../../HomePage/Components/ItemCard";
import { DocumentInterface } from "@/backend/modules/Documents/document.interface";
import { DocumentI } from "@/services/types";

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
    </div>
  );
}

export default PopularDocuments;