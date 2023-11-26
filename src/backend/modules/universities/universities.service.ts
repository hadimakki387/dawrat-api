
import httpStatus from "http-status";
import { NextRequest, NextResponse } from "next/server";
import University from "./universities.model";
import MongoConnection from "@/backend/utils/db";
import { returnArrayData, returnData } from "@/backend/helper-functions/returnData";
import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";

export const getUniversities = async (req: NextRequest) => {
  MongoConnection();
  const params = new URL(req.url as string);
  const title = params.searchParams.get("title");
  const limit = params.searchParams.get("limit");

  if (title) {
    const regex = new RegExp(title, "i");
    const result = await University.find({ title: regex });
    if (limit)
      return new NextResponse(
        JSON.stringify(returnArrayData(result.slice(0, +limit)))
      );
    return new NextResponse(JSON.stringify(returnArrayData(result)));
  }
  const result = await University.find();

  if(limit)
  return new NextResponse(
    JSON.stringify(returnArrayData(result.slice(0, +limit)))
  );

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
