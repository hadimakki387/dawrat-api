import University from "@/modules/universities/universities.model";
import { getUniversities } from "@/modules/universities/universities.service";
import { universities } from "@/services/constants";
import MongoConnection from "@/utils/db";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

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
