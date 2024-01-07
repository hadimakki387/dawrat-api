import {Api, createApi , fetchBaseQuery,BaseQueryFn,FetchArgs,FetchBaseQueryError} from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"



export const mainApi = createApi  ({
    reducerPath: "mainApi",
  
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_API_URL,
    }),
    endpoints: () => ({}),
  });
  