import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import UserRepositoryImpl from "../../../data/userRepositoryImpl";
import User from "../../../domain/entities/user"
import UsersServiceImpl from "../../../domain/usecases/usersService";
import {RootState} from "../../configureStore";


interface data {
    userList: Array<User>
}

const initialState: data = {
    userList : []
}

export const requests = createAsyncThunk("userSlice/request", async ()=>{
    const userRepo = new UserRepositoryImpl()
    const userSerivce = new UsersServiceImpl(userRepo)
    const userList = await userSerivce.GetUser()
    return userList
})

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(requests.fulfilled, (state, action) => ({
            ...state,
            userList: action.payload,
        }))
    }
})

export const userList = (state:RootState) => state.userSlice.userList

export default userSlice.reducer