import { DomainInterface } from "@/backend/modules/domains/domain.interface";
import { mainApi } from ".";

const ExtendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getDomainsUsingUniversityId: builder.query<DomainInterface[],string>({
      query: (id: string) => ({
        url: `university/domains/${id}`,
        method: "GET",
      }),
    }),
    getDomainById: builder.query<DomainInterface, string>({
      query: (id) => ({
        url: `/domain/single/${id}`,
        method: "GET",
      }),
    }),
    getAllDomains: builder.query<
      DomainInterface[],
      { title: string; limit: number }
    >({
      query: ({ title, limit }) => ({
        url: `/domain?&${title ? `title=${title}` : ""}&${
          limit ? `limit=${limit}` : ""
        }`,
        method: "GET",
      }),
    }),
    createDomain: builder.mutation<
      DomainInterface,
      { body: Omit<DomainInterface, "id">; univerisityId: string }
    >({
      query: ({ body, univerisityId }) => ({
        url: `/domain`,
        method: "POST",
        body,
      }),
      onQueryStarted: async (
        { univerisityId },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data: createdDomain } = await queryFulfilled;

          dispatch(
            ExtendedApi.util.updateQueryData(
              "getDomainsUsingUniversityId",
              univerisityId,
              (draft) => {
                draft.unshift(createdDomain);
              }
            )
          );
        } catch {}
      },
    }),
  }),
});

export const {
  useGetDomainsUsingUniversityIdQuery,
  useCreateDomainMutation,
  useGetAllDomainsQuery,
  useGetDomainByIdQuery,
} = ExtendedApi;
