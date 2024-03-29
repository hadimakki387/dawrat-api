import { getIdFromUrl } from "@/backend/helper-functions/getIdFromUrl";
import { returnArrayData } from "@/backend/helper-functions/returnData";
import MongoConnection from "@/backend/utils/db";
import { utapi } from "@/backend/utils/uploadThing";
import httpStatus from "http-status";
import { NextRequest, NextResponse } from "next/server";
import Course from "../Courses/courses.model";
import { SolutionInterface } from "../solutions/solutions.interface";
import Solution from "../solutions/solutions.mode";
import University from "../universities/universities.model";
import {
  updateUserUploads
} from "../user/user.helperFunctions";
import User, { CurrentYear, Semester } from "../user/user.model";
import { checkDocumentTitle } from "./document.helperFunction";
import Document, { Language } from "./document.model";
import {
  createDocumentValidation,
  createManyDocumentsValidation,
} from "./document.validation";

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

  const course = await Course.findById(userBody.course);
  const university = await University.findById(userBody.university);
  const language = await Language.findById(userBody.language);
  const year = await CurrentYear.findById(userBody.year);
  const semester = await Semester.findById(userBody.semester);

  const doc = await Document.create({
    ...userBody,
    courseName: course.title,
    universityName: university.title,
    yearName: year.title,
    languageName: language.title,
    semesterName: semester.title,
  });

  if (!doc) {
    return new NextResponse(
      JSON.stringify({ message: "Something went Wrong, Doc Not Created" }),
      { status: httpStatus.BAD_REQUEST }
    );
  }

  const updatedUser = await updateUserUploads(userBody.ownerId);
  // const updatedCourse = await updateDocsCountInCourse(userBody.course);

  return new NextResponse(
    JSON.stringify({ doc: doc, updatedUser: updatedUser }),
    { status: 200 }
  );
};

export const createManyDocuments = async (req: NextRequest) => {
  MongoConnection();
  const userBody = await req.json();
  const verifyData = createManyDocumentsValidation.body.validate(userBody);
  if (verifyData.error) {
    return new NextResponse(
      JSON.stringify({ message: verifyData.error.message }),
      { status: 400 }
    );
  }
  const checkTitles = await Promise.all(
    userBody.docs.map((doc: any) => checkDocumentTitle(doc.name))
  );
  if (checkTitles.includes(true)) {
    return new NextResponse(
      JSON.stringify({ message: "Title already Taken" }),
      { status: 400 }
    );
  }
  const course = await Course.findById(userBody.course);
  const university = await University.findById(userBody.university);
  const language = await Language.findById(userBody.language);
  const year = await CurrentYear.findById(userBody.year);
  const semester = await Semester.findById(userBody.semester);

  const createDocuments = await Promise.all(
    userBody?.docs?.map(async (DocData: any) => {
      const doc = await Document.create({
        university: userBody.university,
        domain: userBody.domain,
        course: userBody.course,
        doc: DocData,
        courseName: course.title,
        universityName: university.title,
        ownerId: userBody.ownerId,
        title: DocData.name,
        description: DocData.name,
        year: userBody.year,
        language: userBody.language,
        yearName: year.title,
        languageName: language.title,
        semester: userBody.semester,
        semesterName: semester.title,
      });
      if (!doc) {
        return new NextResponse(
          JSON.stringify({ message: "Something went Wrong, Doc Not Created" }),
          { status: httpStatus.BAD_REQUEST }
        );
      }

      return doc;
    })
  );

  // const updatedCourse = await updateDocsCountInCourse(userBody.course);
  const updatedUser = await updateUserUploads(userBody.ownerId);
  return new NextResponse(
    JSON.stringify({ docs: createDocuments, updatedUser: updatedUser }),
    { status: 200 }
  );
};

export const getRecommendedDocumentsInDomain = async (req: NextRequest) => {
  MongoConnection();
  //i want to get the top 8 documents that have the highest upvotes at a specific university using the university id
  const id = getIdFromUrl(req.url);
  const documents = await Document.find({ domain: id })
    .sort({ upvotes: -1 })
    .limit(8);

  return new NextResponse(JSON.stringify(returnArrayData(documents)), {
    status: 200,
  });
};

export const getDocumentsByCourseId = async (req: NextRequest) => {
  MongoConnection();
  const id = getIdFromUrl(req.url);
  const params = new URLSearchParams(req.url);
  const sort = params.get("sort");
  //set the sort to be sorted according to date or upvotes according to the query params

  if (sort === "date") {
    const documents = await Document.find({ course: id }).sort({
      createdAt: -1,
    });
    return new NextResponse(JSON.stringify(returnArrayData(documents)), {
      status: 200,
    });
  } else {
    const documents = await Document.find({ course: id }).sort({ upvotes: -1 });

    return new NextResponse(JSON.stringify(returnArrayData(documents)), {
      status: 200,
    });
  }
};

export const getDocumentsByOwnerId = async (req: NextRequest) => {
  MongoConnection();
  const id = getIdFromUrl(req.url);
  const documents = await Document.find({ ownerId: id });

  return new NextResponse(JSON.stringify(returnArrayData(documents)), {
    status: 200,
  });
};

export const DeleteDocument = async (req: NextRequest) => {
  MongoConnection();
  const id = getIdFromUrl(req.url);

  const doc = await Document.findById(id);

  if (!doc) {
    return new NextResponse(JSON.stringify({ message: "Document Not Found" }), {
      status: httpStatus.NOT_FOUND,
    });
  }

  const user = await User.findById(doc.ownerId);

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "User Not Found" }), {
      status: httpStatus.NOT_FOUND,
    });
  }

  // i want to remove the document from reviewed documents array in user

  // const filteredArray = user.reviewedDocuments.filter(
  //   (doc: string) => doc !== id
  // );

  // const updateUser = await User.findByIdAndUpdate(
  //   user._id,
  //   { reviewedDocuments: filteredArray },
  //   { new: true }
  // );
  const body = await req.json();

  if (doc.solution) {
    const solution: SolutionInterface | null = await Solution.findById(
      doc.solution
    );
    if (!solution) return NextResponse.json({ message: "Solution not found" });
    await Document.findByIdAndUpdate(
      solution.document,
      { solution: "" },
      { new: true }
    );

    try {
      await utapi.deleteFiles([solution.doc.key]);
    } catch (error: any) {
      return NextResponse.json({ message: error?.code }, { status: 400 });
    }
    // const deleteSolution = await Solution.findByIdAndDelete(doc.solution);
  }

  // const DeletedDoc = await Document.findByIdAndDelete(id);
  const deleteFiles = await utapi.deleteFiles(body);

  if (!deleteFiles.success) {
    return new NextResponse(
      JSON.stringify({ message: "Somthing Went Wrong" }),
      { status: httpStatus.INTERNAL_SERVER_ERROR }
    );
  }
  const updatedUser = await updateUserUploads(doc.ownerId);
  return new NextResponse(JSON.stringify({ updatedUser: updatedUser }), {
    status: httpStatus.OK,
  });
};

export const updateDocument = async (req: NextRequest) => {
  MongoConnection();
  const id = getIdFromUrl(req.url);
  const body = await req.json();
  const doc = await Document.findById(id);

  if (!doc) {
    return new NextResponse(JSON.stringify({ message: "Document Not Found" }), {
      status: httpStatus.NOT_FOUND,
    });
  }

  const updatedDoc = await Document.findByIdAndUpdate(id, body, { new: true });

  return new NextResponse(JSON.stringify(updatedDoc), { status: 200 });
};

export const handleUpvote = async (req: NextRequest) => {
  MongoConnection();
  const id = getIdFromUrl(req.url);
  const body = await req.json();

  const doc = await Document.findById(id);

  if (!doc) {
    return new NextResponse(JSON.stringify({ message: "Document Not Found" }), {
      status: httpStatus.NOT_FOUND,
    });
  }

  const user = await User.findById(body.user);

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "User Not Found" }), {
      status: httpStatus.NOT_FOUND,
    });
  }

  const isAlreadyUpvoted = user.likedDocuments.find(
    (upvote: string) => String(upvote) === id
  );
  const isAlreadyDownvoted = user.dislikedDocuments.find(
    (downvote: string) => String(downvote) === id
  );

  if (isAlreadyUpvoted) {
    const filterLikedDocs = user.likedDocuments.filter(
      (upvote: string) => String(upvote) !== id
    );

    const updatedDoc = await Document.findByIdAndUpdate(
      id,
      { $inc: { upvotes: -1 } },
      { new: true }
    );

    const updatedUser = await User.findByIdAndUpdate(
      body.user,
      {
        likedDocuments: filterLikedDocs,
        $inc: { helpedStudents: -1 },
      },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({
        upvotes: updatedDoc.upvotes,
        downvotes: updatedDoc.downvotes,
        likedDocuments: updatedUser.likedDocuments,
        dislikedDocuments: updatedUser.dislikedDocuments,
      }),
      { status: 200 }
    );
  }

  if (isAlreadyDownvoted) {
    const filterDislikedDocs = user.dislikedDocuments.filter(
      (downvote: string) => String(downvote) !== id
    );

    const updateLikedDocuments = [id, ...user.likedDocuments];

    const updatedDoc = await Document.findByIdAndUpdate(
      id,
      { $inc: { upvotes: 1, downvotes: -1 } },
      { new: true }
    );

    const updatedUser = await User.findByIdAndUpdate(
      body.user,
      {
        dislikedDocuments: filterDislikedDocs,
        likedDocuments: updateLikedDocuments,
      },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({
        upvotes: updatedDoc.upvotes,
        downvotes: updatedDoc.downvotes,
        likedDocuments: updatedUser.likedDocuments,
        dislikedDocuments: updatedUser.dislikedDocuments,
      }),
      {
        status: 200,
      }
    );
  }

  const updateLikedDocuments = [id, ...user.likedDocuments];

  const updatedDoc = await Document.findByIdAndUpdate(
    id,
    { $inc: { upvotes: 1 } },
    { new: true }
  );

  const updatedUser = await User.findByIdAndUpdate(
    body.user,
    { likedDocuments: updateLikedDocuments, $inc: { helpedStudents: 1 } },
    { new: true }
  );

  return new NextResponse(
    JSON.stringify({
      upvotes: updatedDoc.upvotes,
      downvotes: updatedDoc.downvotes,
      likedDocuments: updatedUser.likedDocuments,
      dislikedDocuments: updatedUser.dislikedDocuments,
    }),
    {
      status: 200,
    }
  );
};

export const handleDownvote = async (req: NextRequest) => {
  MongoConnection();
  const id = getIdFromUrl(req.url);
  const body = await req.json();
  const doc = await Document.findById(id);

  if (!doc) {
    return new NextResponse(JSON.stringify({ message: "Document Not Found" }), {
      status: httpStatus.NOT_FOUND,
    });
  }

  const user = await User.findById(body.user);

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "User Not Found" }), {
      status: httpStatus.NOT_FOUND,
    });
  }

  const isAlreadyDownvoted = user.dislikedDocuments.find(
    (downvote: string) => String(downvote) === id
  );

  const isAlreadyUpvoted = user.likedDocuments.find(
    (upvote: string) => String(upvote) === id
  );

  if (isAlreadyDownvoted) {
    const filteredArray = user.dislikedDocuments.filter(
      (downvote: string) => String(downvote) !== id
    );

    const updatedDoc = await Document.findByIdAndUpdate(
      id,
      { $inc: { downvotes: -1 } },
      { new: true }
    );

    const updatedUser = await User.findByIdAndUpdate(
      body.user,
      { dislikedDocuments: filteredArray },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({
        upvotes: updatedDoc.upvotes,
        downvotes: updatedDoc.downvotes,
        likedDocuments: updatedUser.likedDocuments,
        dislikedDocuments: updatedUser.dislikedDocuments,
      }),
      { status: 200 }
    );
  }

  if (isAlreadyUpvoted) {
    const filterLikedDocs = user.likedDocuments.filter(
      (upvote: string) => String(upvote) !== id
    );

    const updateDislikedDocuments = [id, ...user.dislikedDocuments];

    const updatedDoc = await Document.findByIdAndUpdate(
      id,
      { $inc: { downvotes: 1, upvotes: -1 } },
      { new: true }
    );

    const updatedUser = await User.findByIdAndUpdate(
      body.user,
      {
        likedDocuments: filterLikedDocs,
        dislikedDocuments: updateDislikedDocuments,
      },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({
        upvotes: updatedDoc.upvotes,
        downvotes: updatedDoc.downvotes,
        likedDocuments: updatedUser.likedDocuments,
        dislikedDocuments: updatedUser.dislikedDocuments,
      }),
      {
        status: 200,
      }
    );
  }

  const updateDislikedDocuments = [id, ...user.dislikedDocuments];

  const updatedDoc = await Document.findByIdAndUpdate(
    id,
    { $inc: { downvotes: 1 } },
    { new: true }
  );

  const updatedUser = await User.findByIdAndUpdate(
    body.user,
    { dislikedDocuments: updateDislikedDocuments },
    { new: true }
  );

  return new NextResponse(
    JSON.stringify({
      upvotes: updatedDoc.upvotes,
      downvotes: updatedDoc.downvotes,
      likedDocuments: updatedUser.likedDocuments,
      dislikedDocuments: updatedUser.dislikedDocuments,
    }),
    {
      status: 200,
    }
  );
};
