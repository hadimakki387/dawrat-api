import { DocumentInterface } from "@/backend/modules/Documents/document.interface";
import { mainApi } from ".";
import { DocumentI } from "@/services/types";

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
                console.log("accessed");
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
                console.log("accessed");
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
      onQueryStarted: async ({ ownerId }, { dispatch, queryFulfilled }) => {
        try {
          const { data: updatedUser } = await queryFulfilled;
          console.log("this is the owner id")
          console.log(ownerId)
          dispatch(
            ExtendedApi.util.updateQueryData(
              "getDocumentsByOwnerId",
              ownerId,
              (draft) => {
                console.log("accessed");
                const doc = draft.find((doc) => doc.ownerId === ownerId);
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
  useUpdateDocumentMutation
} = ExtendedApi;
