
import { create } from "@/backend/modules/user/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(res: NextRequest) {
  return new Response("This is GET", { status: 200 });
}
export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  return await create(data);
}
