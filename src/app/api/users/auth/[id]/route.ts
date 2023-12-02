
import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";
import { getUserById } from "@/backend/modules/user/user.service";
import MongoConnection from "@/backend/utils/db";
import httpStatus from "http-status";

export async function GET(req: Request) {
  MongoConnection();
  const id = getIdFromUrl(req.url);
  if (id === "undefined") {
    return new Response(
      JSON.stringify({
        message: "Unauthorized",
        status: httpStatus.UNAUTHORIZED,
      }),
      { status: httpStatus.UNAUTHORIZED }
    );
  }
  return await getUserById(id);
}
