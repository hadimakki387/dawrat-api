import { getDomainByUniversityId } from "@/backend/modules/domains/domain.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getDomainByUniversityId(req);
}
