import api from "./htppClient";
import  {AxiosInstance, AxiosRequestConfig} from "axios";

type  HTTPRequestConfig = AxiosRequestConfig
const Https = (axios:AxiosInstance) =>{
    return{
        get: <T>(url: string, config: HTTPRequestConfig = {}) => {
            return axios.get<T>(url, config);
        },
        delete: <T>(url: string, config: HTTPRequestConfig = {}) => {
            return axios.delete<T>(url, config);
        },
        put: <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
            return axios.put<T>(url, body, config);
        },
        patch: <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
            return axios.patch<T>(url, body, config);
        },
        post: <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
            return axios.post<T>(url, body, config);
        },
    }
}

export const Htpp = Https(api)