import { url } from "inspector";
import { mainApi } from "..";
import Cookies from "js-cookie";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ data }) => ({
        url: "/users/register",
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

export const { useRegisterUserMutation } = extendedApi;
