import { NextResponse } from "next/server";
import httpStatus from "http-status";
import { verifyToken } from "./backend/lib/auth";

export async function middleware(request: Request) {
  const bereer = request.headers.get("Authorization");
  console.log("this is the middleware")

  if (!bereer) {
    const error = new NextResponse(
      JSON.stringify({ message: "Authorization header missing" }),
      { status: httpStatus.UNAUTHORIZED }
    );
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: httpStatus.UNAUTHORIZED }
    );
  }

  const verify =
    bereer &&
    (await verifyToken(bereer).catch((err) => {
      console.log(err);
    }));

  if (!verify) {
    return NextResponse.json(
      { error: "Invalid Token" },
      { status: httpStatus.UNAUTHORIZED }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/profile/:path*",
};
