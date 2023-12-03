import { QuestionInterface } from "@/backend/modules/questions/questions.interface";
import { mainApi } from ".";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getQuestions: build.query<QuestionInterface[],void>({
      query: () => "questions",
    }),
    getQuestionById: build.query<QuestionInterface[],string>({
      query: (id) => `questions/${id}`,
    }),
  }),
});

export const { useGetQuestionsQuery, useGetQuestionByIdQuery } = extendedApi;
