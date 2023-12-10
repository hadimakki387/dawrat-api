import {
  createDomain,
  getDomain,
} from "@/backend/modules/domains/domain.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getDomain(req);
}

export async function POST(req: NextRequest) {
  return await createDomain(req);
}
