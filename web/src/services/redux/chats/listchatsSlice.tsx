import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserRepositoryImpl from "../../../data/userRepositoryImpl";
import UsersServiceImpl from "../../../domain/usecases/usersService";
import { RootState } from "../../configureStore";
import UserChats from "../../../domain/entities/userChats";

interface data {
  chats: Array<UserChats>;
  chatsSuccess: string;
  chatsError: any;
  chatsLoading: boolean;
}

const initialState: data = {
  chats: [],
  chatsSuccess: "",
  chatsError: "",
  chatsLoading: false,
};

export const requestListChats = createAsyncThunk(
  "requestListChats/request",
  async (_, thunkAPI) => {
    try {
      const requestListChatsRepo = new UserRepositoryImpl();
      const requestListChatsService = new UsersServiceImpl(
        requestListChatsRepo
      );
      const requestListContacts = await requestListChatsService.GetChats();
      return requestListContacts;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetStateListChats = createAction("RESET_LISTCHATS");

export const listChatsSlice = createSlice({
  name: "listChatsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestListChats.fulfilled, (state, action) => {
        state.chats = action.payload;
        state.chatsSuccess = "Listado com sucesso";
        state.chatsLoading = false;
      })
      .addCase(requestListChats.rejected, (state, action) => {
        state.chatsError = action.payload;
        state.chatsLoading = false;
      })
      .addCase(requestListChats.pending, (state) => {
        state.chatsLoading = true;
      })
      .addCase(resetStateListChats, () => initialState);
  },
});

export const requestListContacts = (state: RootState) =>
  state.listChatsSlice.chats;

export default listChatsSlice.reducer;
