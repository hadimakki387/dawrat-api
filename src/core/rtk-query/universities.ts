import { mainApi } from ".";
import Cookies from "js-cookie";

const ExtendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getUniversities: builder.query({
      query: ({ title, limit }) => ({
        url: `university?${title ? `&title=${title}` : ``}${
          limit ? `&limit=${limit}` : ``
        }`,
        method: "GET",
      }),
    }),
    getUniversityById: builder.query({
      query: ({ id }) => ({
        url: `university/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUniversitiesQuery, useGetUniversityByIdQuery } =
  ExtendedApi;
