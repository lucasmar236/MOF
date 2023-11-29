import axios from "axios";

// const API_URL = "http://54.233.165.115:8080/api/v1"
const API_URL = "http://localhost:8080/api/v1"

 const api = axios.create({
    baseURL: API_URL,
})

// api.interceptors.request.use( async req =>{
//
//     config.headers.Authorization = `Bearer ${localStorage.getItem("auth")}`
//     // config.=('Access-Control-Allow-Origin: *')
//     // config.headers('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS')
//     return req
// })

api.interceptors.request.use( async req =>{
    let authUser = sessionStorage.getItem("auth")
    if(authUser !== null){
        req.headers.Authorization = "Bearer" + authUser
    }
    return req
})

api.interceptors.response.use(
    response => response,
    error => {
        try{
            return Promise.reject(error.response.data.error)
        }catch {
            return Promise.reject("Erro ao conectar")
        }
    }
)

export default api
