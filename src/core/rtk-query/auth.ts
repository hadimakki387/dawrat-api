import { mainApi } from ".";

const ExtendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url: `users/${id}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetUserQuery } = ExtendedApi;
