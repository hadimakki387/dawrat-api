import { DeleteDocument } from "@/backend/modules/Documents/document.service";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
    return await DeleteDocument(req);
  }