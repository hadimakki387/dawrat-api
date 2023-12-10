import { UserI } from "@/services/types";
import { mainApi } from ".";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecentlyReviewedData: builder.query<any[],any>({
      query: (body) => ({
        url: `/users/recently-reviewed`,
        method: "PATCH",
        body,
      }),
    }),
    getUser: builder.query<UserI,string>({
      query: (id) => ({
        url: `users/auth/${id}`,
        method: "GET",
      }),
      transformResponse: (response:UserI) => {
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
              console.log("accessed");
              draft.firstName = updatedUser.firstName;
              draft.lastName = updatedUser.lastName;
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
  }),
});

export const {
  useGetRecentlyReviewedDataQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateUserUniversityMutation,
  useChangePasswordMutation,
} = extendedApi;
