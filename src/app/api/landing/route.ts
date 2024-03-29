import { returnArrayData } from "@/backend/helper-functions/returnData";
import Document from "@/backend/modules/Documents/document.model";
import University from "@/backend/modules/universities/universities.model";
import User from "@/backend/modules/user/user.model";
import MongoConnection from "@/backend/utils/db";

export async function GET() {
  MongoConnection();
  const universities = await University.find().limit(10);
  const documents = await Document.find().sort({ upvotes: -1 }).limit(10);
  const usersCount = await User.countDocuments();
  const documentsCount = await Document.countDocuments();

  return new Response(
    JSON.stringify({
      universities: returnArrayData(universities),
      documents: returnArrayData(documents),
      usersCount,
      documentsCount,
    })
  );
}
