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
      query: (body) => ({
        url: `/documents/get-many`,
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
  }),
});

export const { useCreateDocumentMutation, useGetManyDocumentsByIdQuery,useGetSingleDocumentQuery } = ExtendedApi;