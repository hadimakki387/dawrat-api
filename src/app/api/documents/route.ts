import { NextRequest, NextResponse } from "next/server";
import { utapi } from "@/backend/utils/uploadThing";
import httpStatus from "http-status";
import { createDocument } from "@/backend/modules/Documents/document.service";
import { deleteDocFromUploadThing } from "@/backend/modules/Documents/document.helperFunction";

export async function DELETE(req: NextRequest) {
  return await deleteDocFromUploadThing(req)
}

export async function POST(req: NextRequest) {
  return await createDocument(req);
}

