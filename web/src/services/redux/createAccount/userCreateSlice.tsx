import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserRepositoryImpl from "../../../data/userRepositoryImpl";
import UserClass from "../../../domain/entities/userRegister";
import UsersServiceImpl from "../../../domain/usecases/usersService";
import { RootState } from "../../configureStore";

interface data {
  userCreate: Array<UserClass>;
  sendUserCreate: Object;
  sendUserCreateSuccess: string;
  sendUserCreateError: any;
  sendUserCreateLoading: boolean;
}

const initialState: data = {
  userCreate: [],
  sendUserCreate: {
    FirstName: "",
    LastName: "",
    Password: "",
    Email: "",
    UserName: "",
    NumberPhone: "",
    Birth: "",
  },
  sendUserCreateSuccess: "",
  sendUserCreateError: "",
  sendUserCreateLoading: false,
};

export const requestCreate = createAsyncThunk(
  "userCreate/request",
  async (data: Object, thunkAPI) => {
    try {
      const userRepo = new UserRepositoryImpl();
      const userService = new UsersServiceImpl(userRepo);
      const sendUserCreate = await userService.PostUserCreate(data);
      return sendUserCreate;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetStateCreate = createAction("RESET");

export const userCreateSlice = createSlice({
  name: "userCreateSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestCreate.fulfilled, (state, action) => {
        state.sendUserCreate = action.payload;
        state.sendUserCreateSuccess = "Usuário criado com sucesso!";
        state.sendUserCreateLoading = false;
      })
      .addCase(requestCreate.rejected, (state, action) => {
        state.sendUserCreateLoading = false;
        state.sendUserCreateError = action.payload;
      })
      .addCase(requestCreate.pending, (state) => {
        state.sendUserCreateLoading = true;
      })
      .addCase(resetStateCreate, () => initialState);
  },
});

export const sendUserCreate = (state: RootState) =>
  state.userCreateSlice.sendUserCreate;
export default userCreateSlice.reducer;
