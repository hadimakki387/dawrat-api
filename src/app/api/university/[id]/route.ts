import { getUnversityById } from "@/backend/modules/universities/universities.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getUnversityById(req);
}
