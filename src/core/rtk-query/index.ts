import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

console.log(process.env.NEXT_PUBLIC_API_URL)

export const mainApi = createApi({
    reducerPath: "mainApi",
    tagTypes: [],
  
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: `${Cookies.get("access")}`,
      },
    }),
    endpoints: () => ({}),
  });
  