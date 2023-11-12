import { url } from "inspector";
import { mainApi } from "..";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ data }) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = extendedApi;
