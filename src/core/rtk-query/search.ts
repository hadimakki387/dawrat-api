import { mainApi } from ".";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    searchData: builder.query<
      any,
      { title: string; university?: string; course?: string }
    >({
      query: ({ title, university, course }) => ({
        url: `/search?${title ? `&title=${title}` : ``}${
          university ? `&university=${university}` : ``
        }${course ? `&course=${course}` : ``}`,
      }),
    }),
  }),
});

export const { useSearchDataQuery } = extendedApi;
