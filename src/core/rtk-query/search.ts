import { SemesterInterface } from "@/services/types";
import { mainApi } from ".";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    searchData: builder.query<
      any,
      { title: string; university?: string; course?: string;language?:string;semester?:string }
    >({
      query: ({ title, university, course ,language,semester}) => ({
        url: `/search?${title ? `&title=${title}` : ``}${
          university ? `&university=${university}` : ``
        }${course ? `&course=${course}` : ``}${language ? `&language=${language}` : ``}${semester ? `&semester=${semester}` : ``}`,
      }),
    }),
  
  }),
});

export const { useSearchDataQuery } = extendedApi;
