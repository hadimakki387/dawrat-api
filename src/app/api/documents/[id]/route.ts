import { getDocumentById } from "@/backend/modules/Documents/document.helperFunction";
import { DeleteDocument, updateDocument } from "@/backend/modules/Documents/document.service";
import httpStatus from "http-status";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return await getDocumentById(req);
}

export async function DELETE(req: NextRequest) {
  return await DeleteDocument(req);
}

export async function PATCH(req: NextRequest) {
  return await updateDocument(req);
}
