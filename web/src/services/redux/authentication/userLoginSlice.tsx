import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserRepositoryImpl from "../../../data/userRepositoryImpl";
import User from "../../../domain/entities/userRegister";
import UserLogin from "../../../domain/entities/userLogin";
import UsersServiceImpl from "../../../domain/usecases/usersService";
import { RootState } from "../../configureStore";

interface data {
  userList: Array<User>;
  sendUser: Object;
  userSuccess: string;
  userError: any;
  userLoading: boolean;
  user: Object;
}

const initialState: data = {
  userList: [],
  sendUser: {
    username: "",
    email: "",
    password: "",
  },
  userSuccess: "",
  userError: "",
  userLoading: false,
  user: {},
};

// export const requests = createAsyncThunk("userSlice/request", async ()=>{
//     const userRepo = new UserRepositoryImpl()
//     const userSerivce = new UsersServiceImpl(userRepo)
//     const userList = await userSerivce.GetUser()
//     return userList
// })

export const requestLogin = createAsyncThunk(
  "userSlice/request",
  async (data: Object, thunkAPI) => {
    try {
      const userRepo = new UserRepositoryImpl();
      const userService = new UsersServiceImpl(userRepo);
      const sendUser = await userService.PostUserLogin(data);
      return sendUser;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetStateLogin = createAction("RESET_LOGIN");

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestLogin.fulfilled, (state, action) => {
        state.sendUser = action.payload;
        state.userLoading = false;
        state.userSuccess = "Usuário Logado com sucesso!";
      })
      .addCase(requestLogin.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      })
      .addCase(requestLogin.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(resetStateLogin, () => initialState);
  },
});

export const sendUser = (state: RootState) => state.userSlice.sendUser;
export default userSlice.reducer;
