import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserRepositoryImpl from "../../../data/userRepositoryImpl";
import UsersServiceImpl from "../../../domain/usecases/usersService";
import { RootState } from "../../configureStore";
import CreatePrivateChat from "../../../domain/entities/createPrivateChat";

interface data {
  chatCode: Object;
  chatCodeSuccess: string;
  chatCodeError: any;
  chatCodeLoading: boolean;
}

const initialState: data = {
  chatCode: {
    chat: "",
  },
  chatCodeSuccess: "",
  chatCodeError: "",
  chatCodeLoading: false,
};

export const requestChatPrivateCode = createAsyncThunk(
  "requestChatPrivateCode/request",
  async (data: Object, thunkAPI) => {
    try {
      const requestChatPrivateCodeRepo = new UserRepositoryImpl();
      const requestChatPrivateCodeService = new UsersServiceImpl(
        requestChatPrivateCodeRepo
      );
      const requestChatPrivateCode =
        await requestChatPrivateCodeService.PostUserCreatePrivateChat(data);
      return requestChatPrivateCode;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetStateChatPrivateCode = createAction("RESET_PRIVATECHAT");

export const listChatPrivateCodeSlice = createSlice({
  name: "listChatPrivateCodeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestChatPrivateCode.fulfilled, (state, action) => {
        state.chatCode = action.payload;
        state.chatCodeSuccess = "Listado com sucesso";
        state.chatCodeLoading = false;
      })
      .addCase(requestChatPrivateCode.rejected, (state, action) => {
        state.chatCodeError = action.payload;
        state.chatCodeLoading = false;
      })
      .addCase(requestChatPrivateCode.pending, (state) => {
        state.chatCodeLoading = true;
      })
      .addCase(resetStateChatPrivateCode, () => initialState);
  },
});

export const requesPrivateChatCode = (state: RootState) =>
  state.listChatPrivateCodeSlice.chatCode;

export default listChatPrivateCodeSlice.reducer;
