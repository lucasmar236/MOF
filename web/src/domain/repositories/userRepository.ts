import UserClass from "../entities/userRegister";
import UserLogin from "../entities/userLogin";
import TwoFactors from "../entities/twoFactors";
import ChangePassword from "../entities/changePassword";
import Usercontacts from "../entities/usercontacts";

export default interface UserRepository {
  // GetUser(): Promise<UserClass[]>

  GetContacts(token:any):Promise<Usercontacts[]>

  PostUserLogin(user: Object): Promise<UserLogin>;

  PostUserCreate(user: Object): Promise<UserClass>;

  PostUserCreateCodeVerify(code: Object): Promise<TwoFactors>;

  PostCodeVerify(code: Object): Promise<TwoFactors>;

  PostCodeVerifyChangePass(code: Object): Promise<TwoFactors>;

  PutChangePassword(infos: Object): Promise<ChangePassword>;
}
