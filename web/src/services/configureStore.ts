import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./redux/authentication/userSlice"

export const store = configureStore({
    reducer:{
        userSlice
    }
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch