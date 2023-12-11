import { mainApi } from ".";
import Cookies from "js-cookie";

const ExtendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteUploadedPdf: builder.mutation({
      query: ( body ) => ({
        url: `documents`,
        method: "PATCH",
        body: body,
      }),
    }),
  }),
});

export const { useDeleteUploadedPdfMutation } = ExtendedApi;
