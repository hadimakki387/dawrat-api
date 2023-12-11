import { NextRequest, NextResponse } from "next/server";
import { utapi } from "@/backend/utils/uploadThing";
import httpStatus from "http-status";
import { createDocument } from "@/backend/modules/Documents/document.service";

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const deleteFiles = await utapi.deleteFiles(body.doc);
  console.log(deleteFiles);

  if (!deleteFiles.success) {
    return new NextResponse(
      JSON.stringify({ message: "Somthing Went Wrong" }),
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }

  return new NextResponse(JSON.stringify({ message: "Deleted Successfully" }), {
    status: httpStatus.OK,
  });
}

export async function POST(req: NextRequest) {
  return await createDocument(req);
}

