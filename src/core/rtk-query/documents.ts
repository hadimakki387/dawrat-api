import { mainApi } from ".";

const ExtendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createDocument: builder.mutation({
      query: (body) => ({
        url: `/documents`,
        method: "POST",
        body,
      }),
    }),
    getManyDocumentsById: builder.query({
      query: ({ body, limit }) => ({
        url: `/documents/get-many?${limit ? `limit=${limit}` : ""}`,
        method: "PATCH",
        body,
      }),
    }),
    getSingleDocument: builder.query({
      query: (id) => ({
        url: `/documents/${id}`,
        method: "GET",
      }),
    }),
    getRecommendedDocumentsInDomain: builder.query({
      query: (id) => ({
        url: `/domain/courses/recommended/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateDocumentMutation,
  useGetManyDocumentsByIdQuery,
  useGetSingleDocumentQuery,
  useGetRecommendedDocumentsInDomainQuery,
} = ExtendedApi;
