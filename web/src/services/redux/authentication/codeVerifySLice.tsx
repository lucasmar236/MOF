import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import UserRepositoryImpl from "../../../data/userRepositoryImpl";
import UsersServiceImpl from "../../../domain/usecases/usersService";
import {requestCreate} from "../createAccount/userCreateSlice";
import {RootState} from "../../configureStore";

interface data {
    codeVerify: Object
    successCode: string
    errorCode: string
}

const initialState: data = {
    codeVerify:{
        code: ""
    },
    successCode: "",
    errorCode: ""
}

export const requestCodeVerify = createAsyncThunk("userCodeVerify/request",async(data:Object)=>{
    const codeRepo = new UserRepositoryImpl()
    const codeService =  new UsersServiceImpl(codeRepo)
    const sendCodeVerify = await codeService.PostCodeVerify(data)
    return sendCodeVerify
})

export const codeVerifySlice = createSlice({
    name: "codeVerifySlice",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(requestCreate.fulfilled,(state, action) =>({
            ...state,
            codeVerify:action.payload,
            succesCode: "Usuário logado com sucesso!"
        }))
        builder.addCase(requestCreate.rejected,(state, action) =>({
            ...state,
            errorCode:"Erro!"
        }))
    }
})

export const sendCodeVerify = (state:RootState) => state.codeVerifySlice.codeVerify

export default codeVerifySlice.reducer