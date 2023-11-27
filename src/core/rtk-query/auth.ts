import { mainApi } from ".";

const ExtendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url: `users/auth/${id}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetUserQuery } = ExtendedApi;
