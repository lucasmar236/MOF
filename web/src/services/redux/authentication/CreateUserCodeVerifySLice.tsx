import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserRepositoryImpl from "../../../data/userRepositoryImpl";
import UsersServiceImpl from "../../../domain/usecases/usersService";
import { RootState } from "../../configureStore";

interface data {
  CreateUserCodeVerify: Object;
  CreateUserSuccessCode: string;
  CreateUserErrorCode: any;
  loadingCreateUserCode: boolean;
}

const initialState: data = {
  CreateUserCodeVerify: {
    code: "",
  },
  CreateUserSuccessCode: "",
  CreateUserErrorCode: "",
  loadingCreateUserCode: false,
};

export const requestCreaUserCodeVerify = createAsyncThunk(
  "userCodeVerify/request",
  async (data: Object, thunkAPI) => {
    try {
      const codeCreateUserRepo = new UserRepositoryImpl();
      const codeCreateUserService = new UsersServiceImpl(codeCreateUserRepo);
      const sendCreateUserCodeVerify =
        await codeCreateUserService.PostUserCreateCodeVerify(data);
      return sendCreateUserCodeVerify;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetStateCreateUserVerify = createAction(
  "RESET_CREATEUSERVERIFY"
);

export const CreateUsercodeVerifySlice = createSlice({
  name: "CreateUsercodeVerifySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestCreaUserCodeVerify.fulfilled, (state, action) => {
        state.CreateUserCodeVerify = action.payload;
        state.loadingCreateUserCode = false;
        state.CreateUserSuccessCode = "Usuário logado com sucesso!";
      })
      .addCase(requestCreaUserCodeVerify.rejected, (state, action) => {
        state.CreateUserErrorCode = action.payload;
        state.loadingCreateUserCode = false;
      })
      .addCase(requestCreaUserCodeVerify.pending, (state) => {
        state.loadingCreateUserCode = true;
      })
      .addCase(resetStateCreateUserVerify, () => initialState);
  },
});

export const sendCreateUserCodeVerify = (state: RootState) =>
  state.CreateUsercodeVerifySlice.CreateUserCodeVerify;

export default CreateUsercodeVerifySlice.reducer;
