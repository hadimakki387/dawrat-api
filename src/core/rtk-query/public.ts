import { DocumentInterface } from "@/backend/modules/Documents/document.interface";
import { mainApi } from ".";
import { SolutionInterface } from "@/backend/modules/solutions/solutions.interface";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicDocumentsById: builder.query<DocumentInterface, string>({
      query: (id) => ({
        url: `/public/documents/${id}`,
        method: "GET",
      }),
    }),
    getPublicSolutionsById: builder.query<SolutionInterface, string>({
      query: (id) => ({
        url: `/public/solutions/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPublicDocumentsByIdQuery,
  useGetPublicSolutionsByIdQuery,
} = extendedApi;
