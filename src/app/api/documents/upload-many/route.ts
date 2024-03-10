import { createManyDocuments } from "@/backend/modules/Documents/document.service";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await createManyDocuments(req);
}