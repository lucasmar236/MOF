import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/authentication/userLoginSlice";
import codeVerifySlice from "./redux/authentication/codeVerifySLice";
import userCreateSlice from "./redux/createAccount/userCreateSlice";
import infosChangePassSlice from "./redux/changePassword/changePassSlice";
import codeVerifyChangePassSlice from "./redux/authentication/codeVerifyChangePassSLice";
import CreateUsercodeVerifySlice from "./redux/authentication/CreateUserCodeVerifySLice";
import listContactsSlice from "./redux/contacts/listContactsSlice";
import listBlockedsSlice from "./redux/blockeds/listBlockedsSlice";
import listChatsSlice from "./redux/chats/listchatsSlice";
 
export const store = configureStore({
  reducer: {
    userSlice,
    userCreateSlice,
    codeVerifySlice,
    infosChangePassSlice,
    codeVerifyChangePassSlice,
    CreateUsercodeVerifySlice,
    listContactsSlice,
    listBlockedsSlice,
    listChatsSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
