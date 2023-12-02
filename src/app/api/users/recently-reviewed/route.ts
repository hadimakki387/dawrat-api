import { getRecentlyViewed } from "@/backend/modules/user/user.service";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  return await getRecentlyViewed(req)
}
