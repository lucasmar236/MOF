import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserRepositoryImpl from "../../../data/userRepositoryImpl";
import UsersServiceImpl from "../../../domain/usecases/usersService";
import { RootState } from "../../configureStore";

interface data {
  codeVerifyChangePass: Object;
  successCodeChangePass: string;
  errorCodeChangePass: any;
  loadingCodeChangePass: boolean;
}

const initialState: data = {
  codeVerifyChangePass: {
    code: "",
  },
  successCodeChangePass: "",
  errorCodeChangePass: "",
  loadingCodeChangePass: false,
};

export const requestCodeVerifyChangePass = createAsyncThunk(
  "userCodeVerifyChangePass/request",
  async (data: Object, thunkAPI) => {
    try {
      const codeRepoChangePass = new UserRepositoryImpl();
      const codeServiceChangePass = new UsersServiceImpl(codeRepoChangePass);
      const sendCodeVerifyChangePass =
        await codeServiceChangePass.PostCodeVerify(data);
      return sendCodeVerifyChangePass;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetStateChangePassCodeVerify = createAction(
  "RESET_CODEVERIFYCHANGEPASS"
);

export const codeVerifyChangePassSlice = createSlice({
  name: "codeVerifyChangePassSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestCodeVerifyChangePass.fulfilled, (state, action) => {
        state.codeVerifyChangePass = action.payload;
        state.loadingCodeChangePass = false;
        state.successCodeChangePass = "Usuário logado com sucesso!";
      })
      .addCase(requestCodeVerifyChangePass.rejected, (state, action) => {
        state.errorCodeChangePass = action.payload;
        state.loadingCodeChangePass = false;
      })
      .addCase(requestCodeVerifyChangePass.pending, (state) => {
        state.loadingCodeChangePass = true;
      })
      .addCase(resetStateChangePassCodeVerify, () => initialState);
  },
});

export const sendCodeVerifyChangePass = (state: RootState) =>
  state.codeVerifyChangePassSlice.codeVerifyChangePass;

export default codeVerifyChangePassSlice.reducer;
