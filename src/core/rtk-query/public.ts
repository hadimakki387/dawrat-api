import { DocumentInterface } from "@/backend/modules/Documents/document.interface";
import { mainApi } from ".";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicDocumentsById: builder.query<DocumentInterface, string>({
        query: (id) => ({
          url: `/public/documents/${id}`,
          method: "GET",
        }),
      }),
  }),
});

export const { useGetPublicDocumentsByIdQuery } = extendedApi;
