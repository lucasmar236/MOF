import UserClass from "../entities/user";
import UserRepository from "../repositories/userRepository";

export default class UsersServiceImpl {
    userRepo: UserRepository

    constructor(ir: UserRepository) {
        this.userRepo = ir
    }

    async GetUser(): Promise<UserClass[]>{
        return this.userRepo.GetUser()
    }
}