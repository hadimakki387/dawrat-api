import { courseInterface } from "@/backend/modules/Courses/courses.interface";
import { mainApi } from ".";
import { DomainInterface } from "@/backend/modules/domains/domain.interface";

const ExtendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query<
      courseInterface[],
      { title?: string; limit?: number }
    >({
      query: ({ title, limit }) => ({
        url: `courses?${title ? `&title=${title}` : ``}${
          limit ? `&limit=${limit}` : ``
        }`,
        method: "GET",
      }),
    }),
    getCourseById: builder.query<courseInterface, string>({
      query: (id) => ({
        url: `courses/${id}`,
        method: "GET",
      }),
    }),
    getCoursesByUserId: builder.query<
      courseInterface[],
      {
        id: string;
        limit?: number;
      }
    >({
      query: ({ id, limit }) => ({
        url: `users/courses/${id}`,
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
    getCoursesByUniversityId: builder.query<
      courseInterface[],
      {
        id: string;
        limit?: number;
      }
    >({
      query: ({ id, limit }) => ({
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
    updateReviewdCourses: builder.mutation<
      any,
      { id: string; body: { course: string } }
    >({
      query: ({ id, body }) => ({
        url: `/users/update-reviewed-courses/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    createCourse: builder.mutation<
      DomainInterface,
      {
        domainId: string;
        body: Pick<
          courseInterface,
          | "title"
          | "description"
          | "domain"
          | "universityName"
          | "university"
          | "ownerId"
        >;
      }
    >({
      query: ({ body, domainId }) => ({
        url: `/courses`,
        method: "POST",
        body,
      }),
      onQueryStarted: async ({ domainId }, { dispatch, queryFulfilled }) => {
        try {
          const { data: newCourse } = await queryFulfilled;

          dispatch(
            ExtendedApi.util.updateQueryData(
              "getCoursesByDomainId",
              domainId,
              (draft) => {
                draft.unshift(newCourse);
              }
            )
          );
        } catch {}
      },
    }),
  }),
});
export const {
  useGetAllCoursesQuery,
  useGetManyCoursesQuery,
  useGetCoursesByUniversityIdQuery,
  useGetCoursesByDomainIdQuery,
  useUpdateReviewdCoursesMutation,
  useGetCourseByIdQuery,
  useGetCoursesByUserIdQuery,
  useCreateCourseMutation,
} = ExtendedApi;
