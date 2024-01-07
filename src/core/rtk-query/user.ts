import { UserI } from "@/services/types";
import { mainApi } from ".";
import { StudylistInterface } from "@/backend/modules/studylist/studylist.interface";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecentlyReviewedData: builder.query<any[], any>({
      query: (body) => ({
        url: `/users/recently-reviewed`,
        method: "PATCH",
        body,
      }),
    }),
    getUser: builder.query<UserI, string>({
      query: (id) => ({
        url: `users/auth/${id}`,
        method: "GET",
      }),
      transformResponse: (response: UserI) => {
        return response;
      },
    }),
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body,
      }),
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          const { data: updatedUser } = await queryFulfilled;
          dispatch(
            extendedApi.util.updateQueryData("getUser", id, (draft) => {
              draft.firstName = updatedUser.firstName;
              draft.lastName = updatedUser.lastName;
              draft.university = updatedUser.university;
              draft.domain = updatedUser.domain;
            })
          );
        } catch {}
      },
    }),
    updateUserUniversity: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/university/${id}`,
        method: "PATCH",
        body,
      }),
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          const { data: updatedUser } = await queryFulfilled;
          dispatch(
            extendedApi.util.updateQueryData("getUser", id, (draft) => {
              draft.university = updatedUser;
            })
          );
        } catch {}
      },
    }),
    changePassword: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/change-password/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    createStudylist: builder.mutation<
      StudylistInterface,
      {
        body: Partial<Omit<StudylistInterface, "id" | "_id" | "owner">>;
        id: string;
      }
    >({
      query: ({ body, id }) => ({
        url: `/users/studylist/${id}`,
        method: "POST",
        body,
      }),
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          const { data: createdStudyList } = await queryFulfilled;
          dispatch(
            extendedApi.util.updateQueryData("getStudylist", id, (draft) => {
              draft.unshift(createdStudyList);
            })
          );
        } catch {}
      },
    }),
    updateStudylist: builder.mutation<
      string[],
      { body: string; id: string; userId: string }
    >({
      query: ({ body, id, userId }) => ({
        url: `/users/studylist/${id}`,
        method: "PATCH",
        body: {
          document: body,
        },
      }),
      onQueryStarted: async ({ userId, id }, { dispatch, queryFulfilled }) => {
        try {
          const { data: createdStudyList } = await queryFulfilled;
          dispatch(
            extendedApi.util.updateQueryData(
              "getStudylist",
              userId,
              (draft) => {
                const studyList = draft.find(
                  (studylist) => studylist.id === id
                );
                if (studyList) {
                  studyList.documents = createdStudyList;
                }
              }
            )
          );
        } catch {}
      },
    }),
    deleteStudylist: builder.mutation<void, { id: string; userId: string }>({
      query: ({ id, userId }) => ({
        url: `/users/studylist/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async ({ id, userId }, { dispatch, queryFulfilled }) => {
        try {
          const { data: createdStudyList } = await queryFulfilled;
          dispatch(
            extendedApi.util.updateQueryData(
              "getStudylist",
              userId,
              (draft) => {
                const index = draft.findIndex(
                  (studylist) => studylist.id === id
                );
                draft.splice(index, 1);
              }
            )
          );
        } catch {}
      },
    }),
    getSingleStudylist: builder.query<StudylistInterface, string>({
      query: (id) => ({
        url: `/users/studylist/single/${id}`,
        method: "GET",
      }),
    }),
    getStudylist: builder.query<StudylistInterface[], string>({
      query: (id) => ({
        url: `/users/studylist/${id}`,
        method: "GET",
      }),
    }),
    generateOtp: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: `/reset-password/generate-otp`,
        method: "PATCH",
        body: {
          email: email,
        },
      }),
    }),
    verifyOtpAndChangePassword: builder.mutation<
      void,
      { email: string; otp: number; password: string }
    >({
      query: ({ email, otp, password }) => ({
        url: `/reset-password`,
        method: "POST",
        body: {
          email: email,
          otp: otp,
          password: password,
        },
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `/users/auth`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetRecentlyReviewedDataQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateUserUniversityMutation,
  useChangePasswordMutation,
  useCreateStudylistMutation,
  useUpdateStudylistMutation,
  useDeleteStudylistMutation,
  useGetStudylistQuery,
  useGenerateOtpMutation,
  useVerifyOtpAndChangePasswordMutation,
  useGetSingleStudylistQuery,
  useLogoutMutation,
} = extendedApi;
