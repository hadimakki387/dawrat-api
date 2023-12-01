import { NextRequest } from "next/server";
import Document from "./document.model";
import { returnArrayData } from "@/backend/helper-functions/returnData";

export const checkDocumentTitle = async (title: string) => {
  const doc = await Document.findOne({ title: title });
  if (doc) {
    return true;
  }

  return false;
};

export const getManyDocumentsById = async (req: NextRequest) => {
  const body = await req.json();
  const documents = await Document.find({ _id: { $in: body } });
  return new Response(JSON.stringify(returnArrayData(documents.slice(0,5)) || []), {
    status: 200,
  });
};
