
import { NextRequest, NextResponse } from "next/server";

export async function GET(res: NextRequest) {
  return new Response("This is GET", { status: 200 });
}
export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  console.log("createUser")
  return new Response("hello");
}
export async function PATCH(req: NextRequest, res: NextResponse) {
  return new Response("this is PATCH", { status: 200 });
}
export async function DELETE(req: NextRequest, res: NextResponse) {
  return new Response("this is DELETE", { status: 200 });
}
export async function PUT(req: NextRequest, res: NextResponse) {
  return new Response("this is PUT", { status: 200 });
}
