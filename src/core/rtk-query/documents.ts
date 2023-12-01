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
  }),
});

export const { useCreateDocumentMutation } = ExtendedApi;