import {combineReducers} from "@reduxjs/toolkit"
import { mainApi } from "../rtk-query"
import profileSlice from "./profile/redux/profile-slice"

const reducers = combineReducers({
    profile:profileSlice,
    [mainApi.reducerPath]:mainApi.reducer
})

export default reducers

