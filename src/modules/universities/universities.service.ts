import { getIdFromUrl } from "@/helper-functions/getIdFromUrl";
import { returnArrayData, returnData } from "@/helper-functions/returnData";
import MongoConnection from "@/utils/db";
import httpStatus from "http-status";
import { NextRequest, NextResponse } from "next/server";
import University from "./universities.model";

export const getUniversities = async (req: NextRequest) => {
  MongoConnection();
  const params = new URL(req.url as string);
  const title = params.searchParams.get("title");
  if (title) {
    const regex = new RegExp(title, "i");
    const result = await University.find({ title: regex });
    return new NextResponse(
      JSON.stringify(returnArrayData(result.slice(0, 5)))
    );
  }
  const result = await University.find();

  return new NextResponse(JSON.stringify(returnArrayData(result)));
};

export const getUnversityById = async (req: NextRequest) => {
  MongoConnection();
  const id = getIdFromUrl(req.url);
  const result = await University.findById(id);
  if (!result)
    return new NextResponse(
      JSON.stringify({ message: "University not found" }),
      { status: httpStatus.NOT_FOUND }
    );

  return new NextResponse(JSON.stringify(returnData(result)));
};
