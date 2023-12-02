import { mainApi } from ".";

const ExtendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getDomainsUsingUniversityId: builder.query({
      query: (id: string) => ({
        url: `university/domains/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {useGetDomainsUsingUniversityIdQuery} = ExtendedApi;
