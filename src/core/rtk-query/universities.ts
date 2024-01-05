import { UniversityInterface } from "@/backend/modules/universities/universities.interface";
import { mainApi } from ".";
import Cookies from "js-cookie";

const ExtendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getUniversities: builder.query<
      UniversityInterface[],
      { title?: string; limit?: number }
    >({
      query: ({ title, limit }) => ({
        url: `university?${title ? `&title=${title}` : ``}${
          limit ? `&limit=${limit}` : ``
        }`,
        method: "GET",
      }),
    }),
    getUniversityById: builder.query<UniversityInterface, { id: string }>({
      query: ({ id }) => ({
        url: `university/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUniversitiesQuery, useGetUniversityByIdQuery } =
  ExtendedApi;
