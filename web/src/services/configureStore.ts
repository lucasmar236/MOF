import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./redux/authentication/userSlice"
import codeVerifySlice from "./redux/authentication/codeVerifySLice";
import userCreateSlice from "./redux/createAccount/userCreateSlice";

export const store = configureStore({
    reducer:{
        userSlice,
        userCreateSlice,
        codeVerifySlice,

    }
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch