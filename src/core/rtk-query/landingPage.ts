import { mainApi } from ".";
import Cookies from "js-cookie";



const ExtendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "users/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response:{user:any,token:string}) => {
        console.log(response)
        if ("token" in response) {
          Cookies.set("dawratToken", response.token);
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
      transformResponse: (response:{user:any,token:string}) => {
        if ("token" in response) {
          Cookies.set("dawratToken", response.token);
          Cookies.set("dawratUserId", response.user.id);
        }
        return response.user;
      
      },
    }),
  }),
});

export const { useLoginMutation ,useRegisterMutation} = ExtendedApi;