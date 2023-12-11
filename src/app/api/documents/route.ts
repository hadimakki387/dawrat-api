import { deleteDocFromUploadThing } from "@/backend/modules/Documents/document.helperFunction";
import { createDocument } from "@/backend/modules/Documents/document.service";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  return await deleteDocFromUploadThing(req)
}

export async function POST(req: NextRequest) {
  return await createDocument(req);
}

