import { UniversityInterface } from "@/backend/modules/universities/universities.interface";
import { mainApi } from ".";
import Cookies from "js-cookie";
import { DocumentInterface } from "@/backend/modules/Documents/document.interface";

const ExtendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "users/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: { user: any; token: string }) => {
        console.log(response);
        if ("token" in response) {
          Cookies.set("dawratUserId", response.user.id);
        }
        return response.user;
      },
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "users/register",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: { user: any; token: string }) => {
        if ("token" in response) {
          Cookies.set("dawratUserId", response.user.id);
        }
        return response.user;
      },
    }),
    getItems: builder.query<
      {
        universities: UniversityInterface[];
        documents: DocumentInterface[];
        usersCount:number;
        documentsCount:number;
      },
      void
    >({
      query: () => `/landing`,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetItemsQuery } =
  ExtendedApi;
