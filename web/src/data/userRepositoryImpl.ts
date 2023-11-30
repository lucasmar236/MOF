import UserClass from "../domain/entities/userRegister";
import UserRepository from "../domain/repositories/userRepository";
import { Htpp } from "../services/htpp/htppHelper";
import {
  CHANGEPASSWORD,
  CHANGEPASSWORDCODEVERIFY,
  CODEVERIFY,
  CREATEUSER,
  CREATEUSERCODEVERIFY,
  LISTCHATS,
  LISTCONTACTS,
  GETPROFILE,
  LISTBLOCKEDS,
  LOGINUSER,
} from "../services/htpp/routesHtpp/contacts/userContacts";
import UserLogin from "../domain/entities/userLogin";
import TwoFactors from "../domain/entities/twoFactors";
import ChangePassword from "../domain/entities/changePassword";
import Usercontacts from "../domain/entities/usercontacts";
import Userblockeds from "../domain/entities/userBlockeds";
import UserChats from "../domain/entities/userChats";
import UserProfile from "../domain/entities/userProfile";

export default class UserRepositoryImpl implements UserRepository {
  async GetContacts(username?: string): Promise<Usercontacts[]> {
    const resp = await Htpp.get<Usercontacts[]>(`${LISTCONTACTS}?username=${username}`);
    return resp.data;
  }

  async GetBlockeds(): Promise<Userblockeds[]> {
    const resp = await Htpp.get<Userblockeds[]>(LISTBLOCKEDS);
    return resp.data;
  }

  async GetProfile(): Promise<UserProfile> {
    const resp = await Htpp.get<UserProfile>(GETPROFILE);
    return resp.data;
  }

  async GetChats(): Promise<UserChats[]> {
    const resp = await Htpp.get<UserChats[]>(LISTCHATS);
    return resp.data;
  }

  // async GetUser(): Promise<UserClass[]> {
  //     const resp = await Htpp.get<UserClass[]>(USERSLIST)
  //     return resp.data
  // }

  async PostUserLogin(user: Object): Promise<UserLogin> {
    const resp = await Htpp.post<UserLogin>(LOGINUSER, user);
    return resp.data;
  }

  async PostUserCreate(user: Object): Promise<UserClass> {
    const resp = await Htpp.post<UserClass>(CREATEUSER, user);
    return resp.data;
  }

  async PostUserCreateCodeVerify(code: Object): Promise<TwoFactors> {
    const resp = await Htpp.post<TwoFactors>(CREATEUSERCODEVERIFY, code);
    return resp.data;
  }

  async PostCodeVerify(code: Object): Promise<TwoFactors> {
    const resp = await Htpp.post<TwoFactors>(CODEVERIFY, code);
    return resp.data;
  }

  async PostCodeVerifyChangePass(code: Object): Promise<TwoFactors> {
    const resp = await Htpp.post<TwoFactors>(CHANGEPASSWORDCODEVERIFY, code);
    return resp.data;
  }

  async PutChangePassword(infos: Object): Promise<ChangePassword> {
    const resp = await Htpp.put<ChangePassword>(CHANGEPASSWORD, infos);
    return resp.data;
  }
}
