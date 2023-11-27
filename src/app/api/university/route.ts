import {
  createUniversity,
  getUniversities,
} from "@/backend/modules/universities/universities.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // MongoConnection();

  // const params = new URL(req.url as string);

  // const title = params.searchParams.get("title");

  // // universities.map((university)=>{
  // //   University.create(university)
  // // })
  // //  await University.create({ title: "Phoenicia University", abr: "PU" })
  // // University.insertMany(universities)
  // //   .then((result) => {
  // //     console.log(`${result.length} universities inserted successfully.`);
  // //   })
  // //   .catch((error) => {
  // //     console.error(`Error inserting universities: ${error}`);
  // //   });

  // console.log("saved");

  // if (title) {
  //   const regex = new RegExp(title, "i");
  //   const result = await University.find({ title: regex });
  //   return new NextResponse(JSON.stringify(result.slice(0, 5)));
  // }
  // const result = await University.find();
  return await getUniversities(req);
}

export async function POST(req: NextRequest) {
  return await createUniversity(req);
}
