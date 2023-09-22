import UserClass from "../entities/user";

export default interface UserRepository{
    GetUser(): Promise<UserClass[]>
    // PostUser(user:Omit<UserClass, string>) : Promise<UserClass>
}