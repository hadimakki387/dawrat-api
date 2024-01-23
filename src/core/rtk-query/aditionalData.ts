import { LanguageInterface, SemesterInterface, YearInterface } from "@/services/types";
import { mainApi } from ".";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getYears: builder.query<YearInterface[], void>({
      query: () => ({
        url: `/years`,
        method: "GET",
      }),
    }),
    getLanguages: builder.query<LanguageInterface[], void>({
      query: () => ({
        url: `/languages`,
        method: "GET",
      }),
    }),
    getSemesters: builder.query<SemesterInterface[], void>({
      query: () => ({
        url: `/semesters`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetYearsQuery, useGetLanguagesQuery,useGetSemestersQuery } = extendedApi;
