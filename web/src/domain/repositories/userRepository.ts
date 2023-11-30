import UserClass from "../entities/userRegister";
import UserLogin from "../entities/userLogin";
import TwoFactors from "../entities/twoFactors";
import ChangePassword from "../entities/changePassword";
import Usercontacts from "../entities/usercontacts";
import Userblockeds from "../entities/userBlockeds";
import UserChats from "../entities/userChats";
import UserProfile from "../entities/userProfile";

export default interface UserRepository {
  // GetUser(): Promise<UserClass[]>

  GetChats(): Promise<UserChats[]>;

  GetContacts(username?:string): Promise<Usercontacts[]>;

  GetBlockeds(): Promise<Userblockeds[]>;

  GetProfile(): Promise<UserProfile>;

  PostUserLogin(user: Object): Promise<UserLogin>;

  PostUserCreate(user: Object): Promise<UserClass>;

  PostUserCreateCodeVerify(code: Object): Promise<TwoFactors>;

  PostCodeVerify(code: Object): Promise<TwoFactors>;

  PostCodeVerifyChangePass(code: Object): Promise<TwoFactors>;

  PutChangePassword(infos: Object): Promise<ChangePassword>;
}
