import { DocumentInterface } from "@/backend/modules/Documents/document.interface";
import { mainApi } from ".";

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
    getDocumentsByOwnerId: builder.query<DocumentInterface[],string>({
      query: (id) => ({
        url: `/users/documents/${id}`,
        method: "GET",
      }),
    }),
    getSingleDocument: builder.query<DocumentInterface,string>({
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
    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `/documents/${id}`,
        method: "DELETE",
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
} = ExtendedApi;
