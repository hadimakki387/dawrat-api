import { NextRequest, NextResponse } from "next/server";
import { utapi } from "@/backend/utils/uploadThing";
import httpStatus from "http-status";

export async function DELETE(req: NextRequest) {
  // const data = {
  //   name: "14.pdf",
  //   size: 26544,
  //   key: "32a35f9e-d5ea-4b1c-9a2f-56bab9f49188-17n.pdf",
  //   serverData: null,
  //   url: "https://utfs.io/f/32a35f9e-d5ea-4b1c-9a2f-56bab9f49188-17n.pdf",
  // };
  // const files = await utapi.listFiles()
  // console.log(files);
  const body = await req.json();
  const deleteFiles = await utapi.deleteFiles(body);
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
