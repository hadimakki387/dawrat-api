import { SolutionInterface } from "@/backend/modules/solutions/solutions.interface";
import { mainApi } from ".";

const ExtendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleSolution: builder.query<SolutionInterface, string>({
      query: (id) => `/solutions/${id}`,
    }),
    getSolutions: builder.query<
      SolutionInterface[],
      {
        limit?: number;
        title?: string;
      }
    >({
      query: ({ limit, title }) =>
        `/solutions?${limit ? `&limit=${limit}` : ""}${
          title ? `&title=${title}` : ""
        }`,
    }),
    updateSolution: builder.mutation<
      SolutionInterface,
      {
        title: string;
        description: string;
        document: string;
      }
    >({
      query: ({title,description,document}) => ({
        url: `solutions/${document}`,
        method: "PATCH",
        body: {
          title,
          description,
        },
      }),
      onQueryStarted: async ({ document }, { dispatch, queryFulfilled }) => {
        try {
          const { data: updatedSolution } = await queryFulfilled;
          dispatch(
            ExtendedApi.util.updateQueryData(
              "getSingleSolution",
              document,
              (draft) => {
                draft.title = updatedSolution.title;
                draft.description = updatedSolution.description;
              }
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    deleteSolution: builder.mutation<void, string>({
      query: (id) => ({
        url: `solutions/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSingleSolutionQuery,
  useGetSolutionsQuery,
  useUpdateSolutionMutation,
  useDeleteSolutionMutation,
} = ExtendedApi;
