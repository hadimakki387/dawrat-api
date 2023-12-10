import { getDocumentsByOwnerId } from "@/backend/modules/Documents/document.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return await getDocumentsByOwnerId(req);
}