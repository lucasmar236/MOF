import UserClass from "../domain/entities/userRegister";
import UserRepository from "../domain/repositories/userRepository";
import {Htpp} from "../services/htpp/htppHelper";
import {USERSLIST} from "../services/htpp/routesHtpp/contacts/userContacts/index.js";
import UserLogin from "../domain/entities/userLogin";

export default class UserRepositoryImpl implements UserRepository{
    async GetUser(): Promise<UserClass[]> {
        const resp = await Htpp.get<UserClass[]>(USERSLIST)
        return resp.data
    }

    async PostUserLogin(user: Object): Promise<UserLogin> {
        const resp = await Htpp.post<UserLogin>(USERSLIST,user)
        return  resp.data
    }

}