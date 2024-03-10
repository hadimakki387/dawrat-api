import httpStatus from "http-status";
import { NextResponse } from "next/server";

export async function DELETE() {
    //removve the server cookie serverDawratToken
    return new NextResponse(JSON.stringify({ message: "User Deleted" }), {
      status: httpStatus.OK,
      headers: {
        "Set-Cookie": `serverDawratToken=; path=/; HttpOnly; Secure; SameSite=Strict;expires=${new Date(
          0
        )}`,
        "Location": "/home",
      },
    });
  }
  