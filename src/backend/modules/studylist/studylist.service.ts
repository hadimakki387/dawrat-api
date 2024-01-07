import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";
import Studylist from "./studylist.model";
import httpStatus from "http-status";
import { NextRequest, NextResponse } from "next/server";
import {
  returnArrayData,
  returnData,
} from "@/backend/helper-functions/returnData";
import {
  createStudylistValidation,
  updateStudylistValidation,
} from "./studylist.validate";
import User from "../user/user.model";
import { UserInterface } from "../user/user.interfaces";
import { StudylistInterface } from "./studylist.interface";
import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis"; // see below for cloudflare and fastly adapters

const saveToStudyList = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(2, "1 m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export const getStudyListForUser = async (req: Request) => {
  const id = getIdFromUrl(req.url);
  const studylist = await Studylist.find({ owner: id });

  return new NextResponse(JSON.stringify(returnArrayData(studylist)), {
    status: httpStatus.OK,
  });
};

export const CreateStudylist = async (req: Request) => {
  const data = await req.json();
  const id = getIdFromUrl(req.url);
  const {success,remaining} = await saveToStudyList.limit(id);
  if(!success){
    return new NextResponse(JSON.stringify({message:`Too Many Requests!`}), {
      status: httpStatus.BAD_REQUEST,
    });
  }
  const validate = createStudylistValidation.body.validate(data);
  if (validate.error) {
    return new NextResponse(validate.error.message, {
      status: httpStatus.BAD_REQUEST,
    });
  }
  const studylist = await Studylist.create({
    title: data?.title,
    description: data?.description,
    owner: id,
    documents: data?.documents,
  });
  const user: UserInterface | null = await User.findById(id);

  if (!user) {
    return new NextResponse("User not found", {
      status: httpStatus.NOT_FOUND,
    });
  }

  const updateUserStudyList = User.findByIdAndUpdate(
    id,
    { studylist: [studylist._id, ...user.studylist] },
    { new: true }
  );
  return new NextResponse(JSON.stringify(returnData(studylist)), {
    status: httpStatus.CREATED,
  });
};

export const UpdateStudylist = async (req: Request) => {
  const id = getIdFromUrl(req.url);
  const data = await req.json();

  const validate = updateStudylistValidation.body.validate(data);
  if (validate.error) {
    return new NextResponse(validate.error.message, {
      status: httpStatus.BAD_REQUEST,
    });
  }
  const { document,userId } = data;
  const studyList = await Studylist.findById(id);
  const {success,remaining} = await saveToStudyList.limit(userId);
  if(!success){
    return new NextResponse(JSON.stringify({message:`Too Many Requests!`}), {
      status: httpStatus.BAD_REQUEST,
    });
  }

  if (!studyList) {
    return new NextResponse("Study List Not Found", {
      status: httpStatus.NOT_FOUND,
    });
  }
  //check if the the document is already in the if found in the studyList.documents
  //if found remove it
  //if not found add it

  const foundDocument = studyList.documents.find(
    (doc: string[]) => String(doc) === document
  );
  let updatedDocuments = [];

  if (foundDocument) {
    updatedDocuments = studyList.documents.filter(
      (doc: string[]) => String(doc) !== document
    );

    const updateStudylist = await Studylist.findByIdAndUpdate(
      studyList._id,
      { documents: updatedDocuments },
      { new: true }
    );
    return new NextResponse(JSON.stringify(updatedDocuments), {
      status: httpStatus.OK,
    });
  }else{
    updatedDocuments = [document, ...studyList.documents];
    const updateStudylist = await Studylist.findByIdAndUpdate(
      studyList._id,
      { documents: updatedDocuments },
      { new: true }
    );
    return new NextResponse(JSON.stringify(updatedDocuments), {
      status: httpStatus.OK,
    });
  }
};

export const deleteStudylist = async (req: NextRequest) => {
  const id = getIdFromUrl(req.url);
  const studyList = await Studylist.findById(id);

  if (!studyList) {
    return new NextResponse(
      JSON.stringify({
        message: "Study List Not Fount!",
      }),
      {
        status: httpStatus.NOT_FOUND,
      }
    );
  }

  const user = await User.findById(studyList.owner);

  if (!studyList) {
    return new NextResponse(
      JSON.stringify({
        message: "User Not Fount !",
      }),
      {
        status: httpStatus.NOT_FOUND,
      }
    );
  }

  const updatedStudylist = user.studylist.filter(
    (studylist: StudylistInterface) => String(studylist) !== id
  );
  const updateUserStudyList = await User.findByIdAndUpdate(
    studyList.owner,
    { studylist: updatedStudylist },
    { new: true }
  );

  const deleteStudylist = await Studylist.findByIdAndDelete(id);

  return new NextResponse(
    JSON.stringify({
      message: "Study List Deleted!",
    }),
    {
      status: httpStatus.OK,
    }
  );
};
