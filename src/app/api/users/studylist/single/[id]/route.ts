import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";
import { returnData } from "@/backend/helper-functions/returnData";
import Studylist from "@/backend/modules/studylist/studylist.model";
import MongoConnection from "@/backend/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  MongoConnection();
  const id = getIdFromUrl(req.url);
  return new NextResponse(
    JSON.stringify(returnData(await Studylist.findById(id))),
    {
      status: 200,
    }
  );
}
