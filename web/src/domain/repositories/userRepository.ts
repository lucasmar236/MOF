import UserClass from "../entities/userRegister";
import UserLogin from "../entities/userLogin";
import TwoFactors from "../entities/twoFactors";

export default interface UserRepository{
    // GetUser(): Promise<UserClass[]>

    PostUserLogin(user: Object) : Promise<UserLogin>

    PostUserCreate(user: Object) : Promise<UserClass>

    PostCodeVerify(code: Object) : Promise<TwoFactors>
}