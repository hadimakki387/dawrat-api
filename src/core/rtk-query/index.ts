import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

export const mainApi = createApi({
    reducerPath: "mainApi",
    tagTypes: [],
  
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: `${Cookies.get("dawratToken")}`,
      },
    }),
    endpoints: () => ({}),
  });
  