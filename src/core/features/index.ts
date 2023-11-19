import {combineReducers} from "@reduxjs/toolkit"
import { mainApi } from "../rtk-query"
import profileSlice from "./profile/redux/profile-slice"
import homePageSlice from "./landingPage/redux/homePage-slice"
import askAiSlice from "./Ask Ai/redux/askAi-slice"

const reducers = combineReducers({
    profile:profileSlice,
    homePage:homePageSlice,
    askAi:askAiSlice,
    [mainApi.reducerPath]:mainApi.reducer
})

export default reducers

