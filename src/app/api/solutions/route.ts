import {
    createSolution,
    getSolutions
} from "@/backend/modules/solutions/solutions.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getSolutions(req);
}
export async function POST(req: NextRequest) {
  return await createSolution(req);
}

