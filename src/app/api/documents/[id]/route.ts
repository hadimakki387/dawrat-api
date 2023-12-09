import { getDocumentById } from "@/backend/modules/Documents/document.helperFunction";
import { DeleteDocument } from "@/backend/modules/Documents/document.service";
import httpStatus from "http-status";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return await getDocumentById(req);
}

export async function DELETE(req: NextRequest) {
  return await DeleteDocument(req);
}

export async function PATCH(req: NextRequest) {
  return new NextResponse(JSON.stringify({ message: "Not Implemented" }), {
    status: httpStatus.NOT_IMPLEMENTED,
  });
}
