import {combineReducers} from "@reduxjs/toolkit"
import { mainApi } from "../rtk-query"
import profileSlice from "./profile/redux/profile-slice"
import homePageSlice from "./landingPage/redux/homePage-slice"
import askAiSlice from "./Ask Ai/redux/askAi-slice"
import globalSlice from "./global/redux/global-slice"
import uploadSlice from "./Upload/redux/upload-slice"
import courseSlice from "./courses/redux/courses-slice"
import settingsSlice from "./settings/redux/settings-slice"
import searchSlice from "./search/redux/search-slice"

const reducers = combineReducers({
    profile:profileSlice,
    homePage:homePageSlice,
    askAi:askAiSlice,
    global:globalSlice,
    upload:uploadSlice,
    settings:settingsSlice,
    courses:courseSlice,
    search:searchSlice,
    [mainApi.reducerPath]:mainApi.reducer
})

export default reducers

