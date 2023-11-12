import { create } from "@/modules/user/user.service";
import httpStatus from "http-status";
import { NextRequest, NextResponse } from "next/server";

export async function GET(res: NextRequest) {
  return new Response("This is GET", { status: 200 });
}
export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const user = await create(data);
  return new Response(JSON.stringify(user), { status: httpStatus.CREATED });
}
