import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();

  return new Response("test-cookie", {
    headers: {
      "Set-Cookie": `test-cookie=1; path=/; HttpOnly; Secure; SameSite=Strict;expires=${dayjs()
        .add(1, "day")
        .toDate()}`,
    },
  });
}

export async function GET(req: NextRequest, res: NextResponse) {
  const cookies = req.cookies;
  const userId = cookies.get("userId")?.value;
  const collapsed = cookies.get("collapsed")?.value;
  const dawratToken = cookies.get("dawratToken");
  const dawratUserId = cookies.get("dawratUserId")?.value;
  const testCookie = cookies.get("test-cookie")?.value;
  console.log(dawratToken)
  return new Response(req.cookies.toString());
}
