import { mainApi } from ".";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecentlyReviewedData: builder.query({
      query: (body) => ({
        url: `/users/recently-reviewed`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useGetRecentlyReviewedDataQuery } = extendedApi;
