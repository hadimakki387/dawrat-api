import {
  deleteSolution,
  getSolutionById,
  updateSolution,
} from "@/backend/modules/solutions/solutions.service";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  return await deleteSolution(req);
}
export async function GET(req: NextRequest) {
  return await getSolutionById(req);
}
export async function PATCH(req: NextRequest) {
    return await updateSolution(req);
  }