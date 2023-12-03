import { UserI } from "@/services/types";
import { mainApi } from ".";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecentlyReviewedData: builder.query({
      query: (body) => ({
        url: `/users/recently-reviewed`,
        method: "PATCH",
        body,
      }),
      transformResponse: (response) => {
        return response;
      },
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
  }),
});

export const {
  useGetRecentlyReviewedDataQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateUserUniversityMutation
} = extendedApi;
