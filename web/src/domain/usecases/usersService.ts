import UserClass from "../entities/userRegister";
import UserRepository from "../repositories/userRepository";
import UserLogin from "../entities/userLogin";

export default class UsersServiceImpl {
    userRepo: UserRepository

    constructor(ir: UserRepository) {
        this.userRepo = ir
    }

    async GetUser(): Promise<UserClass[]>{
        return this.userRepo.GetUser()
    }

    async PostUserLogin(data:Object){
        return this.userRepo.PostUserLogin(data)
    }
}