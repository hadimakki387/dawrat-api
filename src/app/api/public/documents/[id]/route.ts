import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";
import { returnData } from "@/backend/helper-functions/returnData";
import { getDocumentById } from "@/backend/modules/Documents/document.helperFunction";
import Document from "@/backend/modules/Documents/document.model";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const id = getIdFromUrl(req.url);
  const doc = await Document.findById(id);
  return new Response(JSON.stringify(doc));
}