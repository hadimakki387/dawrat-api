import MongoConnection from "@/backend/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Document from "./documents.model";
import { returnData } from "@/backend/helper-functions/returnData";
import { createDocumentValidation } from "./document.validation";
import { checkDocumentTitle } from "./document.helperFunction";

export const createDocument = async (req: NextRequest) => {
  MongoConnection();
  const userBody = await req.json();
  const verifyData = createDocumentValidation.body.validate(userBody);
  const checkTitle = await checkDocumentTitle(userBody.title);

  if(verifyData.error){
   
    return new NextResponse(JSON.stringify(verifyData.error.message), { status: 400 });
  }
  console.log(!verifyData.error)
  console.log(checkTitle)
//   const doc = await Document.create(document);

  return new NextResponse(JSON.stringify("hello"), { status: 200 });
};
