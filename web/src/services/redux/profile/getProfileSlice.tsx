import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserRepositoryImpl from "../../../data/userRepositoryImpl";
import UsersServiceImpl from "../../../domain/usecases/usersService";
import { RootState } from "../../configureStore";

interface data {
  profile: Object;
  profileSuccess: string;
  profileError: any;
  profileLoading: boolean;
}

const initialState: data = {
  profile: "",
  profileSuccess: "",
  profileError: "",
  profileLoading: false,
};

export const requestGetProfile = createAsyncThunk(
  "requestGetProfile/request",
  async (_, thunkAPI) => {
    try {
      const requestProfileRepo = new UserRepositoryImpl();
      const requestProfileService = new UsersServiceImpl(requestProfileRepo);

      const requestProfile = await requestProfileService.GetProfile();
      return requestProfile;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetStateGetProfile = createAction("RESET_GETPROFILE");

export const getProfileSlice = createSlice({
  name: "getProfileSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestGetProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.profileSuccess = "Listado com sucesso";
        state.profileLoading = false;
      })
      .addCase(requestGetProfile.rejected, (state, action) => {
        state.profileError = action.payload;
        state.profileLoading = false;
      })
      .addCase(requestGetProfile.pending, (state) => {
        state.profileLoading = true;
      })
      .addCase(resetStateGetProfile, () => initialState);
  },
});

export const requestProfile = (state: RootState) =>
  state.getProfileSlice.profile;

export default getProfileSlice.reducer;
