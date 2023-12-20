import { QuestionInterface } from "@/backend/modules/questions/questions.interface";
import { mainApi } from ".";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getQuestions: build.query<QuestionInterface[], void>({
      query: () => "questions",
    }),
    getQuestionById: build.query<QuestionInterface[], string>({
      query: (id) => `questions/${id}`,
    }),
    createQuestion: build.mutation<QuestionInterface, any>({
      query: ({body,id}) => ({
        url: "questions",
        method: "POST",
        body,
      }),
      onQueryStarted: async ({id}, { dispatch, queryFulfilled }) => {
        try {
          const { data: updatedUser } = await queryFulfilled;
          dispatch(
            extendedApi.util.updateQueryData(
              "getQuestionById",
              id,
              (draft) => {

                draft.unshift(updatedUser);
              }
            )
          );
        } catch {}
      },
    }),
  }),
});

export const { useGetQuestionsQuery, useGetQuestionByIdQuery,useCreateQuestionMutation } = extendedApi;
