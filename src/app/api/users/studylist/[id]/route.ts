import {
  CreateStudylist,
  UpdateStudylist,
  deleteStudylist,
  getStudyListForUser,
} from "@/backend/modules/studylist/studylist.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getStudyListForUser(req);
}

export async function PATCH(req: NextRequest) {
  return await UpdateStudylist(req);
}

export async function POST(req: NextRequest) {
  return await CreateStudylist(req);
}

export async function DELETE(req:NextRequest){
  return await deleteStudylist(req);
}