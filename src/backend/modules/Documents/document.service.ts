import MongoConnection from "@/backend/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Document from "./document.model";
import { returnData } from "@/backend/helper-functions/returnData";
import { createDocumentValidation } from "./document.validation";
import { checkDocumentTitle } from "./document.helperFunction";
import User from "../user/user.model";
import { updateUserUploads } from "../user/user.helperFunctions";

export const createDocument = async (req: NextRequest) => {
  MongoConnection();
  const userBody = await req.json();
  const verifyData = createDocumentValidation.body.validate(userBody);
  const checkTitle = await checkDocumentTitle(userBody.title);

  if (verifyData.error) {
    return new NextResponse(
      JSON.stringify({ message: verifyData.error.message }),
      { status: 400 }
    );
  }

  if (checkTitle) {
    return new NextResponse(
      JSON.stringify({ message: "Title already Taken" }),
      { status: 400 }
    );
  }

  const doc = await Document.create(userBody);

  const updatedUser = await updateUserUploads(userBody.ownerId);



  return new NextResponse(
    JSON.stringify({ doc: doc, updatedUser: updatedUser }),
    { status: 200 }
  );
};
