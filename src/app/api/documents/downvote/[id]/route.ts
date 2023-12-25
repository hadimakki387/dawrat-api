import { handleDownvote } from "@/backend/modules/Documents/document.service";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  return await handleDownvote(req);
}
