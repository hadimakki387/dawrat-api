import { getDocumentById } from "@/backend/modules/Documents/document.helperFunction";
import { updateDocument } from "@/backend/modules/Documents/document.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getDocumentById(req);
}



export async function PATCH(req: NextRequest) {
  return await updateDocument(req);
}
