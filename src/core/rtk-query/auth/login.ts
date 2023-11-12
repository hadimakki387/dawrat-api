import { url } from "inspector";
import { mainApi } from "..";
import Cookies from "js-cookie";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ data }) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (res: { user: any; token: string }) => {
        if (res.token) {
          Cookies.set("dawratToken", res.token);
        }
        return res.user;
      },
    }),
  }),
});

export const { useLoginUserMutation } = extendedApi;
