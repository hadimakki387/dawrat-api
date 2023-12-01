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
  }),
});

export const { useCreateDocumentMutation, useGetManyDocumentsByIdQuery } = ExtendedApi;