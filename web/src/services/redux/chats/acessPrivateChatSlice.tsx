import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserRepositoryImpl from "../../../data/userRepositoryImpl";
import UsersServiceImpl from "../../../domain/usecases/usersService";
import { RootState } from "../../configureStore";
import CreatePrivateChat from "../../../domain/entities/createPrivateChat";

interface data {
  sessionCode: Object;
  sessionSuccess: string;
  sessionError: any;
  sessionLoading: boolean;
}

const initialState: data = {
  sessionCode: {
    code: "",
  },
  sessionSuccess: "",
  sessionError: "",
  sessionLoading: false,
};

export const requestAccessChatPrivateCode = createAsyncThunk(
  "requestAccessChatPrivateCode/request",
  async (data: Object, thunkAPI) => {
    try {
      const requestAccessChatPrivateCodeRepo = new UserRepositoryImpl();
      const requestAccessChatPrivateCodeService = new UsersServiceImpl(
        requestAccessChatPrivateCodeRepo
      );
      const requestAccessChatPrivateCode =
        await requestAccessChatPrivateCodeService.PostAcessPrivateChat(data);
      return requestAccessChatPrivateCode;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetStateAccessChatPrivateCode = createAction(
  "RESET_ACCESSPRIVATECHAT"
);

export const listAccessChatPrivateCodeSlice = createSlice({
  name: "listAccessChatPrivateCodeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestAccessChatPrivateCode.fulfilled, (state, action) => {
        state.sessionCode = action.payload;
        state.sessionSuccess = "Sucesso";
        state.sessionLoading = false;
      })
      .addCase(requestAccessChatPrivateCode.rejected, (state, action) => {
        state.sessionError = action.payload;
        state.sessionLoading = false;
      })
      .addCase(requestAccessChatPrivateCode.pending, (state) => {
        state.sessionLoading = true;
      })
      .addCase(resetStateAccessChatPrivateCode, () => initialState);
  },
});

export const requesPrivateAccessChatCode = (state: RootState) =>
  state.listAccessChatPrivateCodeSlice.sessionCode;

export default listAccessChatPrivateCodeSlice.reducer;
