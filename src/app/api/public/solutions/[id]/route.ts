import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";
import { returnData } from "@/backend/helper-functions/returnData";
import Solution from "@/backend/modules/solutions/solutions.mode";
import MongoConnection from "@/backend/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  MongoConnection();
  const id = getIdFromUrl(req.url);
  const solution = await Solution.findById(id);
  if (!solution) return NextResponse.json({ message: "Solution not found" });
  return NextResponse.json(returnData(solution), {
    status: 200,
  });
}
