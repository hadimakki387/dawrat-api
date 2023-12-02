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
        url: `university/courses/${id}`,
        method: "GET",
      }),
    }),
    getCoursesByDomainId: builder.query({
      query: (id: string) => ({
        url: `domain/courses/${id}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetAllCoursesQuery,
  useGetManyCoursesQuery,
  useGetCoursesByUniversityIdQuery,
  useGetCoursesByDomainIdQuery,
} = ExtendedApi;
