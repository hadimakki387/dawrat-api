import { mainApi } from ".";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    searchData: builder.query({
      query: ({ title }) => ({
        url: `/search?${title ? `title=${title}` : ``}`,
      }),
    }),
  }),
});

export const { useSearchDataQuery } = extendedApi;
