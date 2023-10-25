import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import UserRepositoryImpl from "../../../data/userRepositoryImpl";
import UsersServiceImpl from "../../../domain/usecases/usersService";
import {requestCreate} from "../createAccount/userCreateSlice";
import {RootState} from "../../configureStore";

interface data {
    codeVerify: Object
    successCode: string
    errorCode: string
    loadingCode: boolean
}

const initialState: data = {
    codeVerify:{
        code: ""
    },
    successCode: "",
    errorCode: "",
    loadingCode:false
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
            loadingCode:false,
            succesCode: "Usuário logado com sucesso!"
        }))
        builder.addCase(requestCreate.rejected,(state, action) =>({
            ...state,
            errorCode:"Erro ao verificar codigo!",
            loadingCode:false,
        }))
        builder.addCase(requestCreate.pending,(state,action) => ({
            ...state,
            loadingCode:true
        }))
    }
})

export const sendCodeVerify = (state:RootState) => state.codeVerifySlice.codeVerify

export default codeVerifySlice.reducer