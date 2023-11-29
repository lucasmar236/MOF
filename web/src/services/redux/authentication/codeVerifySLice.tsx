import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserRepositoryImpl from "../../../data/userRepositoryImpl";
import UsersServiceImpl from "../../../domain/usecases/usersService";
import { RootState } from "../../configureStore";

interface data {
  codeVerify: Object;
  successCode: string;
  errorCode: any;
  loadingCode: boolean;
}

const initialState: data = {
  codeVerify: {
    code: "",
  },
  successCode: "",
  errorCode: "",
  loadingCode: false,
};

export const requestCodeVerify = createAsyncThunk(
  "userCodeVerify/request",
  async (data: Object, thunkAPI) => {
    try {
      const codeRepo = new UserRepositoryImpl();
      const codeService = new UsersServiceImpl(codeRepo);
      const sendCodeVerify = await codeService.PostCodeVerify(data);
      return sendCodeVerify;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetStateCodeVerify = createAction("RESET_CODEVERIFY");

export const codeVerifySlice = createSlice({
  name: "codeVerifySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestCodeVerify.fulfilled, (state, action) => {
        state.codeVerify = action.payload;
        state.loadingCode = false;
        state.successCode = "Usuário logado com sucesso!";
      })
      .addCase(requestCodeVerify.rejected, (state, action) => {
        state.errorCode = action.payload;
        state.loadingCode = false;
      })
      .addCase(requestCodeVerify.pending, (state) => {
        state.loadingCode = true;
      })
      .addCase(resetStateCodeVerify, () => initialState);
  },
});

export const sendCodeVerify = (state: RootState) =>
  state.codeVerifySlice.codeVerify;

export default codeVerifySlice.reducer;
