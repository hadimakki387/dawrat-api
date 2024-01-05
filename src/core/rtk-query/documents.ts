import { DocumentInterface } from "@/backend/modules/Documents/document.interface";
import { mainApi } from ".";
import { DocumentI, UserI } from "@/services/types";
import { setUser } from "../features/global/redux/global-slice";
import { UserInterface } from "@/backend/modules/user/user.interfaces";

const ExtendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createDocument: builder.mutation({
      query: (body) => ({
        url: `/documents`,
        method: "POST",
        body,
      }),
    }),
    getManyDocumentsById: builder.query({
      query: ({ body, limit }) => ({
        url: `/documents/get-many?${limit ? `limit=${limit}` : ""}`,
        method: "PATCH",
        body,
      }),
    }),
    getDocumentsByOwnerId: builder.query<DocumentInterface[], string>({
      query: (id) => ({
        url: `/users/documents/${id}`,
        method: "GET",
      }),
    }),
    getSingleDocument: builder.query<DocumentInterface, string>({
      query: (id) => ({
        url: `/documents/${id}`,
        method: "GET",
      }),
    }),
    getRecommendedDocumentsInDomain: builder.query({
      query: (id) => ({
        url: `/domain/courses/recommended/${id}`,
        method: "GET",
      }),
    }),
    updateReviewedDocuments: builder.mutation({
      query: ({ id, body, limit }) => ({
        url: `/users/update-reviewed-docs/${id}`,
        method: "PATCH",
        body,
      }),
      onQueryStarted: async ({ limit, id }, { dispatch, queryFulfilled }) => {
        try {
          const { data: updatedUser } = await queryFulfilled;

          dispatch(
            ExtendedApi.util.updateQueryData(
              "getManyDocumentsById",
              { limit: 3, id: id },
              (draft) => {
                draft.unshift(updatedUser);
              }
            )
          );
        } catch {}
      },
    }),
    getDocumentsByCourseId: builder.query({
      query: ({ id, sort }) => ({
        url: `/courses/documents/${id}&${sort ? `sort=${sort}` : ""}`,
        method: "GET",
      }),
    }),
    deleteDocument: builder.mutation<
      any,
      { id: string; body: string[]; ownerId: string }
    >({
      query: ({ id, body }) => ({
        url: `/documents/delete/${id}`,
        method: "PATCH",
        body,
      }),
      onQueryStarted: async ({ ownerId }, { dispatch, queryFulfilled }) => {
        try {
          const { data: updatedUser } = await queryFulfilled;

          dispatch(
            ExtendedApi.util.updateQueryData(
              "getDocumentsByOwnerId",
              ownerId,
              (draft) => {
                // i want to remove the document from the array
                const index = draft.findIndex((doc) => doc._id === ownerId);
                draft.splice(index, 1);
              }
            )
          );
        } catch {}
      },
    }),
    updateDocument: builder.mutation<
      DocumentI,
      {
        id: string;
        body: { title: string; description: string };
        ownerId: string;
      }
    >({
      query: ({ id, body }) => ({
        url: `/documents/${id}`,
        method: "PATCH",
        body,
      }),
      onQueryStarted: async ({ ownerId, id }, { dispatch, queryFulfilled }) => {
        try {
          const { data: updatedUser } = await queryFulfilled;
          dispatch(
            ExtendedApi.util.updateQueryData(
              "getDocumentsByOwnerId",
              ownerId,
              (draft) => {
                const doc = draft.find(
                  (doc: DocumentInterface) => doc.id === id
                );
                if (doc) {
                  doc.title = updatedUser.title;
                  doc.description = updatedUser.description;
                }
              }
            )
          );
        } catch {}
      },
    }),
    upvoteDocument: builder.mutation<
      {
        upvotes: number;
        downvotes: number;
        likedDocuments: string[];
        dislikedDocuments: string[];
      },
      { id: string; user: UserI }
    >({
      query: ({ id, user }) => ({
        url: `/documents/upvote/${id}`,
        method: "PATCH",
        body: {
          user: user.id,
        },
      }),
      onQueryStarted: async ({ id, user }, { dispatch, queryFulfilled }) => {
        try {
          const { data: updatedUser } = await queryFulfilled;

          dispatch(
            ExtendedApi.util.updateQueryData(
              "getSingleDocument",
              id,
              (draft) => {
                draft.upvotes = updatedUser.upvotes;
                draft.downvotes = updatedUser.downvotes;
              }
            )
          );
          dispatch(
            setUser({
              ...user,
              likedDocuments: updatedUser.likedDocuments,
              dislikedDocuments: updatedUser.dislikedDocuments,
            })
          );
        } catch {}
      },
    }),
    downvoteDocument: builder.mutation<
      {
        upvotes: number;
        downvotes: number;
        likedDocuments: string[];
        dislikedDocuments: string[];
      },
      { id: string; user: UserI }
    >({
      query: ({ id, user }) => ({
        url: `/documents/downvote/${id}`,
        method: "PATCH",
        body: {
          user: user?.id,
        },
      }),
      onQueryStarted: async (
        { id, user },
        { dispatch, getState, queryFulfilled }
      ) => {
        try {
          const { data: updatedUser } = await queryFulfilled;

          dispatch(
            ExtendedApi.util.updateQueryData(
              "getSingleDocument",
              id,
              (draft) => {
                draft.upvotes = updatedUser.upvotes;
                draft.downvotes = updatedUser.downvotes;
              }
            )
          );
          dispatch(
            setUser({
              ...user,
              likedDocuments: updatedUser.likedDocuments,
              dislikedDocuments: updatedUser.dislikedDocuments,
            })
          );
        } catch {}
      },
    }),
    getDocumentByUniversityId: builder.query<
      DocumentInterface[],
      { id: string; limit?: number }
    >({
      query: ({ id, limit }) => ({
        url: `/university/documents/${id}&${limit ? `limit=${limit}` : ""}`,
        method: "GET",
      }),
    }),
    getPopularDocumentsInUniversity: builder.query<
      DocumentInterface[],
      { id: string; limit?: number }
    >({
      query: ({ id, limit }) => ({
        url: `/university/documents/popular/${id}&${
          limit ? `limit=${limit}` : ""
        }`,
        method: "GET",
      }),
    }),
    getRecentDocumentsInUniversity: builder.query<
      DocumentInterface[],
      { id: string; limit?: number }
    >({
      query: ({ id, limit }) => ({
        url: `/university/documents/recent/${id}&${
          limit ? `limit=${limit}` : ""
        }`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateDocumentMutation,
  useGetManyDocumentsByIdQuery,
  useGetSingleDocumentQuery,
  useGetRecommendedDocumentsInDomainQuery,
  useUpdateReviewedDocumentsMutation,
  useGetDocumentsByCourseIdQuery,
  useGetDocumentsByOwnerIdQuery,
  useDeleteDocumentMutation,
  useUpdateDocumentMutation,
  useUpvoteDocumentMutation,
  useDownvoteDocumentMutation,
  useGetDocumentByUniversityIdQuery,
  useGetPopularDocumentsInUniversityQuery,
  useGetRecentDocumentsInUniversityQuery,
} = ExtendedApi;
