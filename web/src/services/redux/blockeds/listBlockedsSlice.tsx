import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserRepositoryImpl from "../../../data/userRepositoryImpl";
import UsersServiceImpl from "../../../domain/usecases/usersService";
import { RootState } from "../../configureStore";
import Userblockeds from "../../../domain/entities/userBlockeds";

interface data {
  blockeds: Array<Userblockeds>;
  blockedsSuccess: string;
  blockedsError: any;
  blockedsLoading: boolean;
}

const initialState: data = {
  blockeds: [],
  blockedsSuccess: "",
  blockedsError: "",
  blockedsLoading: false,
};

export const requestListBlockeds = createAsyncThunk(
  "requestListBlockeds/request",
  async (_, thunkAPI) => {
    try {
      const requestBlockedRepo = new UserRepositoryImpl();
      const requestBlockedService = new UsersServiceImpl(requestBlockedRepo);

      const requestBlockeds = await requestBlockedService.GetBlockeds();
      return requestBlockeds;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetStateListBlockeds = createAction("RESET_LISTBLOCKEDS");

export const listBlockedsSlice = createSlice({
  name: "listBlockedsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestListBlockeds.fulfilled, (state, action) => {
        state.blockeds = action.payload;
        state.blockedsSuccess = "Listado com sucesso";
        state.blockedsLoading = false;
      })
      .addCase(requestListBlockeds.rejected, (state, action) => {
        state.blockedsError = action.payload;
        state.blockedsLoading = false;
      })
      .addCase(requestListBlockeds.pending, (state) => {
        state.blockedsLoading = true;
      })
      .addCase(resetStateListBlockeds, () => initialState);
  },
});

export const requestBlockeds = (state: RootState) =>
  state.listBlockedsSlice.blockeds;

export default listBlockedsSlice.reducer;
