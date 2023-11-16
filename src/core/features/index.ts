import {combineReducers} from "@reduxjs/toolkit"
import { mainApi } from "../rtk-query"
import profileSlice from "./profile/redux/profile-slice"
import homePageSlice from "./landingPage/redux/homePage-slice"

const reducers = combineReducers({
    profile:profileSlice,
    homePage:homePageSlice,
    [mainApi.reducerPath]:mainApi.reducer
})

export default reducers

