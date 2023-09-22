import UserClass from "../domain/entities/user";
import UserRepository from "../domain/repositories/userRepository";
import {Htpp} from "../services/htpp/htppHelper";
import {USERSLIST} from "../services/htpp/routesHtpp/contacts/userContacts/index.js";

export default class UserRepositoryImpl implements UserRepository{
    async GetUser(): Promise<UserClass[]> {
        const resp = await Htpp.get<UserClass[]>(USERSLIST)
        return resp.data
    }

}