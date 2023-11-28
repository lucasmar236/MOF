import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import UserRepositoryImpl from "../../../data/userRepositoryImpl";
import User from "../../../domain/entities/userRegister"
import UserLogin from "../../../domain/entities/userLogin"
import UsersServiceImpl from "../../../domain/usecases/usersService";
import {RootState} from "../../configureStore";


interface data {
    userList: Array<User>
    sendUser: Object
    userSuccess: string
    userError: string
    userLoading: boolean
    user: Object
}

const initialState: data = {
    userList : [],
    sendUser :{
        username:"",
        email:"",
        password:""
    },
    userSuccess: "",
    userError: "",
    userLoading:false,
    user:{}
}

// export const requests = createAsyncThunk("userSlice/request", async ()=>{
//     const userRepo = new UserRepositoryImpl()
//     const userSerivce = new UsersServiceImpl(userRepo)
//     const userList = await userSerivce.GetUser()
//     return userList
// })

export const requestLogin = createAsyncThunk("userSlice/request",async(data:Object)=>{
    const userRepo = new UserRepositoryImpl()
    const userService = new UsersServiceImpl(userRepo)
    const sendUser = await  userService.PostUserLogin(data)
    return sendUser
})

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        // builder.addCase(requests.fulfilled, (state, action) => ({
        //     ...state,
        //     userList: action.payload,
        // }))
        builder.addCase(requestLogin.fulfilled,(state,action)=>({
            ...state,
            sendUser:action.payload,
            userLoading:false,
            userSuccess:"Usuário Logado com sucesso!"
        }))
        builder.addCase(requestLogin.rejected,(state,action)=>({
            ...state,
            userLoading:false,
            userError:"Erro ao logar, verifique suas informações!"
        }))
        builder.addCase(requestLogin.pending,(state,action) => ({
            ...state,
            userLoading:true,
            userSuccess:"",
            userError:""
        }))
    }
})

// export const userList = (state:RootState) => state.userSlice.userList
export const sendUser = (state:RootState) => state.userSlice.sendUser
export default userSlice.reducer