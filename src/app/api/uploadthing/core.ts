import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing({
  errorFormatter: (error) => {
    return error.message;
  },
});

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute

    .onUploadComplete(async ({ metadata, file }: any) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
  pdfUploader: f({
    pdf: { maxFileSize: "16MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ metadata, file }: any) => {
    // This code RUNS ON YOUR SERVER after upload
    console.log("Upload complete for userId:", metadata.userId);

    console.log("file url", file.url);
  }),
  multiplePdfUploader: f({
    pdf: { maxFileSize: "16MB", maxFileCount: 10 },
  }).onUploadComplete(async ({ metadata, file }: any) => {
    // This code RUNS ON YOUR SERVER after upload
    console.log("Upload complete for userId:", metadata.userId);

    console.log("file url", file.url);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
