import { NextRequest, NextResponse } from "next/server";
import httpStatus from "http-status";
import { verifyToken } from "./backend/lib/auth";

export async function middleware(request: NextRequest) {
  const cookies = request.cookies;
  const bereer = cookies.get("serverDawratToken")?.value
  console.log("this is the token in the middleware", bereer)

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
  matcher: [
    "/api/domain/:path*",
    "/api/openai/:path*",
    "/api/posts/:path*",
    "/api/questions/:path*",
    "/api/search/:path*",
    "/api/send-email/:path*",
    "/api/profile/:path*",
    "/api/profile/:path*",
    "/api/documents/:path*",
    "/api/university/:path*",
    "/api/courses/:path*",
    "/api/users/auth/:path*",
    "/api/users/[id]/:path*",
    "/api/users/change-password/:path*",
    "/api/users/courses/:path*",
    "/api/users/documents/:path*",
    "/api/users/questions/:path*",
    "/api/users/recently-reviewed/:path*",
    "/api/users/studylist/:path*",
    "/api/users/university/:path*",
    "/api/users/update-reviewed-courses/:path*",
    "/api/users/update-reviewed-docs/:path*",
  ],
};
