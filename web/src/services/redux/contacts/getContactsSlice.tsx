import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserRepositoryImpl from "../../../data/userRepositoryImpl";
import UsersServiceImpl from "../../../domain/usecases/usersService";
import { RootState } from "../../configureStore";
import Usercontacts from "../../../domain/entities/usercontacts";

interface  data {
    contacts : Array<Usercontacts>
    contactsSuccess: string
    contactsError: any
    contactsLoading:boolean
}

const initialState: data = {
    contacts : [],
    contactsSuccess: "",
    contactsError: "",
    contactsLoading:false
}

export const requestListContacts = createAsyncThunk(
    "requestListContacts/request",
    async(token:any,thunkAPI) => {
        try{
            const requestContactRepo = new UserRepositoryImpl()
            const requestContactService = new UsersServiceImpl(requestContactRepo)
            const requestContacts = await requestContactService.GetContacts(token)
            return requestContacts
        }catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data);

        }
    }
)

export const resetStateListContacts = createAction("RESET_LISTCONTACTS")

export const listContactsSlice = createSlice({
    name:"listContactsSlice",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(requestListContacts.fulfilled,(state,action)=>{
                state.contacts = action.payload;
                state.contactsSuccess = "Listado com sucesso";
                state.contactsLoading = false;
            })
            .addCase(requestListContacts.rejected,(state,action)=>{
                state.contactsError = action.payload;
                state.contactsLoading = false;
            })
            .addCase(requestListContacts.pending,(state) => {
                state.contactsLoading = true
            })
            .addCase(resetStateListContacts, () => initialState)
    }
})

export const requestContacts = (state:RootState) => state.listContactsSlice.contacts;

export default listContactsSlice.reducer;