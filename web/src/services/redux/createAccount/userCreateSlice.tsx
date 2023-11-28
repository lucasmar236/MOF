import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import UserRepositoryImpl from "../../../data/userRepositoryImpl";
import UserClass from "../../../domain/entities/userRegister"
import UsersServiceImpl from "../../../domain/usecases/usersService";
import {RootState} from "../../configureStore";


interface data {
    userCreate: Array<UserClass>
    sendUserCreate: Object
    sendUserCreateSuccess: string
    sendUserCreateError: string
    sendUserCreateLoading: boolean
}

const initialState: data = {
    userCreate : [],
    sendUserCreate :{
        FirstName:"",
        LastName:"",
        Password:"",
        Email:"",
        UserName:"",
        NumberPhone:"",
        Birth:""
    },
    sendUserCreateSuccess:"",
    sendUserCreateError: "",
    sendUserCreateLoading: false
}

export const requestCreate = createAsyncThunk("userCreate/request",async(data:Object)=>{
    const userRepo = new UserRepositoryImpl()
    const userService = new UsersServiceImpl(userRepo)
    const sendUserCreate = await  userService.PostUserCreate(data)
    return sendUserCreate
})

export const userCreateSlice = createSlice({
    name: "userCreateSlice",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        // builder.addCase(requests.fulfilled, (state, action) => ({
        //     ...state,
        //     userList: action.payload,
        // }))
        builder.addCase(requestCreate.fulfilled,(state,action)=>({
            ...state,
            sendUserCreate:action.payload,
            sendUserCreateSuccess:"Usuário criado com sucesso!",
            sendUserCreateLoading:false
        }))
        builder.addCase(requestCreate.rejected,(state,action)=>({
            ...state,
            sendUserCreateLoading:false,
            sendUserCreateError:"Usuário ja existe!",
        }))
        builder.addCase(requestCreate.pending,(state,action)=>({
            ...state,
            sendUserCreateLoading:true,
            sendUserCreateSuccess:"",
            sendUserCreateError:""
        }))
    }
})

export const sendUserCreate = (state:RootState) => state.userCreateSlice.sendUserCreate
export default userCreateSlice.reducer