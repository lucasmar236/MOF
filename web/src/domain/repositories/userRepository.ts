import UserClass from "../entities/userRegister";
import UserLogin from "../entities/userLogin";

export default interface UserRepository{
    GetUser(): Promise<UserClass[]>

    PostUserLogin(user: Object) : Promise<UserLogin>
}