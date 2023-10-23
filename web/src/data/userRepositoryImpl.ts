import UserClass from "../domain/entities/userRegister";
import UserRepository from "../domain/repositories/userRepository";
import {Htpp} from "../services/htpp/htppHelper";
import {CODEVERIFY, CREATEUSER, LOGINUSER} from "../services/htpp/routesHtpp/contacts/userContacts/index.js";
import UserLogin from "../domain/entities/userLogin";
import TwoFactors from "../domain/entities/twoFactors";

export default class UserRepositoryImpl implements UserRepository{
    // async GetUser(): Promise<UserClass[]> {
    //     const resp = await Htpp.get<UserClass[]>(USERSLIST)
    //     return resp.data
    // }

    async PostUserLogin(user: Object): Promise<UserLogin> {
        const resp = await Htpp.post<UserLogin>(LOGINUSER,user)
        return  resp.data
    }

    async PostUserCreate(user: Object): Promise<UserClass>{
        const resp = await Htpp.post<UserClass>(CREATEUSER,user)
        return resp.data
    }

    async PostCodeVerify(code:Object): Promise<TwoFactors>{
        const resp = await Htpp.post<TwoFactors>(CODEVERIFY,code)
        return resp.data
    }

}