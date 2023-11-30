import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserRepositoryImpl from "../../../data/userRepositoryImpl";
import UsersServiceImpl from "../../../domain/usecases/usersService";
import { RootState } from "../../configureStore";

interface data {
  infos: Object;
  successInfos: string;
  errorInfos: any;
  loadingInfos: boolean;
}

const initialState: data = {
  infos: {
    confirm_pass: "",
    email: "",
    new_pass: "",
  },
  successInfos: "",
  errorInfos: "",
  loadingInfos: false,
};

export const requestChangePassword = createAsyncThunk(
  "userChangePass/request",
  async (data: Object, thunkAPI) => {
    try {
      const infosChangePassRepo = new UserRepositoryImpl();
      const infosChangePassService = new UsersServiceImpl(infosChangePassRepo);
      const sendInfosChangePass =
        await infosChangePassService.PutChangePassword(data);
      return sendInfosChangePass;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetStateChangePass = createAction("RESET_CHANGEPASS");

export const infosChangePassSlice = createSlice({
  name: "infosChangePassSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestChangePassword.fulfilled, (state, action) => {
        state.infos = action.payload;
        state.successInfos = "sucesso";
        state.loadingInfos = false;
      })
      .addCase(requestChangePassword.rejected, (state, action) => {
        state.errorInfos = "User already exists";
        state.loadingInfos = false;
      })
      .addCase(requestChangePassword.pending, (state) => {
        state.loadingInfos = true;
      })
      .addCase(resetStateChangePass, () => initialState);
  },
});

export const sendInfosChangePass = (state: RootState) =>
  state.infosChangePassSlice.infos;

export default infosChangePassSlice.reducer;
