import { NextResponse } from "next/server";
import Document from "../Documents/document.model";
import User from "./user.model";
import * as bcrypt from "bcryptjs";

export const isEmailTaken = async (email: string) => {
  const user = await User.findOne({ email: email });
  if (user) {
    return true;
  } else {
    return false;
  }
};

export const verifyPass = (pass: string, hash: string) => {
  const isMatch = bcrypt.compare(pass, String(hash));
  return isMatch;
};

export const updateUserUploads = async (userId: string) => {
  const uploads = await Document.find({ ownerId: userId });
  const updateUser = await User.findByIdAndUpdate(
    userId,
    { uploads: uploads.length },
    { new: true }
  );

  return updateUser;
};

export const updateReviewdDocuments = async (userId: string, docId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "User not found" }), {
      status: 400,
    });
  }

  if (user) {
    let recentDocuments = user.reviewedDocuments;
    recentDocuments.unshift(docId);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { recentDocuments: recentDocuments },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({
        message: "Recent Documents Updated",
        updatedUser: updatedUser,
      }),
      { status: 200 }
    );
  }
};
