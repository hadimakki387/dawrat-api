import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";
import { returnData } from "@/backend/helper-functions/returnData";
import Domain from "@/backend/modules/domains/domain.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = getIdFromUrl(req.url);
  return new NextResponse(
    JSON.stringify(returnData(await Domain.findById(id)))
  );
}
