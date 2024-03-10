import { NextRequest, NextResponse } from "next/server";
import {
  createSolutionValidation,
  updateSolutionValidation,
} from "./solutions.validation";
import Solution from "./solutions.mode";
import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";
import {
  returnArrayData,
  returnData,
} from "@/backend/helper-functions/returnData";
import Document from "../Documents/document.model";
import { utapi } from "@/backend/utils/uploadThing";
import { SolutionInterface } from "./solutions.interface";
import MongoConnection from "@/backend/utils/db";

export const createSolution = async (req: NextRequest) => {
  MongoConnection()
  const body = await req.json();
  const validateData = createSolutionValidation.body.validate(body);
  if (validateData.error) {
    return NextResponse.json(validateData.error.message, {
      status: 400,
    });
  }

  const document = await Document.findById(body.document);
  if (!document) return NextResponse.json({ message: "Document not found" });

  const solution = await Solution.create({
    ...body,
    userId: document.ownerId,
    documentName: document.title,
  });

  //set the solution id to the solution in document
  await Document.findByIdAndUpdate(
    solution.document,
    { solution: solution._id },
    { new: true }
  );

  return NextResponse.json(returnData(solution), {
    status: 201,
  });
};

export const getSolutions = async (req: NextRequest) => {
  MongoConnection()
  const params = new URL(req.url).searchParams;
  const limit = params.get("limit");
  const title = new RegExp(params.get("title") || "", "i");
  let query = {};
  if (title) {
    query = { ...query, title };
  }
  const solutions = limit
    ? await Solution.find(query).limit(+limit)
    : await Solution.find(query);
  return NextResponse.json(returnArrayData(solutions), {
    status: 200,
  });
};

export const getSolutionById = async (req: NextRequest) => {
  MongoConnection()
  const id = getIdFromUrl(req.url);
  const solution = await Solution.findById(id);
  if (!solution) return NextResponse.json({ message: "Solution not found" });
  return NextResponse.json(returnData(solution), {
    status: 200,
  });
};

export const updateSolution = async (req: NextRequest) => {
  MongoConnection()
  const body = await req.json();
  const validateData = updateSolutionValidation.body.validate(body);
  if (validateData.error) {
    return NextResponse.json(
      { message: validateData.error.message },
      {
        status: 400,
      }
    );
  }
  const id = getIdFromUrl(req.url);
  const solution = await Solution.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!solution) return NextResponse.json({ message: "Solution not found" });
  return NextResponse.json(returnData(solution), {
    status: 200,
  });
};

export const deleteSolution = async (req: NextRequest) => {
  MongoConnection()
  const id = getIdFromUrl(req.url);
  if (!id)
    return NextResponse.json({ message: "Id is required" }, { status: 400 });

  const solution: SolutionInterface | null = await Solution.findById(id);
  if (!solution) return NextResponse.json({ message: "Solution not found" });
  await Document.findByIdAndUpdate(solution.document, { solution: "" }, { new: true });
  
  try {
    await utapi.deleteFiles([solution.doc.key]);
  } catch (error:any) {
    return NextResponse.json({ message: error?.code }, { status: 400 });
  }
  // const deleteSolution = await Solution.findByIdAndDelete(id);
  if (!solution) return NextResponse.json({ message: "Solution not found" });
  return NextResponse.json(
    {
      message: "Solution deleted successfully",
    },
    {
      status: 200,
    }
  );
};
