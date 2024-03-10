
import { create } from "@/backend/modules/user/user.service";
import { NextRequest } from "next/server";

export async function GET() {
  return new Response("This is GET", { status: 200 });
}
export async function POST(req: NextRequest, ) {
  const data = await req.json();
  return await create(data);
}
