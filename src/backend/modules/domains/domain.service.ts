import {
  returnArrayData,
  returnData,
} from "@/backend/helper-functions/returnData";
import Domain from "./domain.model";
import { NextRequest, NextResponse } from "next/server";
import { createDomainValidation } from "./domain.validate";
import httpStatus from "http-status";
import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";
import MongoConnection from "@/backend/utils/db";

MongoConnection()

export const GetDomainById = async (id: string) => {
  return new NextResponse(
    JSON.stringify(returnData(await Domain.findById(id))),
    { status: httpStatus.OK }
  );
};

export const getDomain = async () => {
  return new NextResponse(
    JSON.stringify(returnArrayData(await Domain.find())),
    { status: httpStatus.OK }
  );
};

export const getDomainByUniversityId = async (req: NextRequest) => {
  const id = getIdFromUrl(req.url);
  return new NextResponse(
    JSON.stringify(returnArrayData(await Domain.find({ university: id }))),
    { status: httpStatus.OK }
  );
};

export const createDomain = async (req: NextRequest) => {
  const data = await req.json();
  const uni = data.university;

  //check if domain already exist in the university
  const domainsInUniversity = await Domain.find({ university: uni });
  const checkIfItExist = domainsInUniversity.find((domain) => {
    return domain.title === data.title;
  });
  if (checkIfItExist)
    return new NextResponse(JSON.stringify("Domain already exist"), {
      status: 400,
    });

  //validate data
  const validateData = createDomainValidation.body.validate(data);
  if (validateData.error)
    return new NextResponse(JSON.stringify(validateData.error.message), {
      status: 400,
    });

  //create domain
  const domain = await Domain.create(data);
  return new NextResponse(JSON.stringify(returnData(domain)), {
    status: 200,
  });
};
