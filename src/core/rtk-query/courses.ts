import { mainApi } from ".";

const ExtendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => ({
        url: `courses`,
        method: "GET",
      }),
    }),
    getManyCourses: builder.query({
      query: (ids: string[]) => ({
        url: `courses/get-many`,
        method: "PATCH",
        body: ids,
      }),
    }),
    getCoursesByUniversityId: builder.query({
      query: (id: string) => ({
        url: `courses/university/${id}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetAllCoursesQuery,useGetManyCoursesQuery,useGetCoursesByUniversityIdQuery } = ExtendedApi;
