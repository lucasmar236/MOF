import UserClass from "../domain/entities/userRegister";
import UserRepository from "../domain/repositories/userRepository";
import { Htpp } from "../services/htpp/htppHelper";
import {
  CHANGEPASSWORD,
  CHANGEPASSWORDCODEVERIFY,
  CODEVERIFY,
  CREATEUSER,
  CREATEUSERCODEVERIFY,
  LOGINUSER,
} from "../services/htpp/routesHtpp/contacts/userContacts/index.js";
import UserLogin from "../domain/entities/userLogin";
import TwoFactors from "../domain/entities/twoFactors";
import ChangePassword from "../domain/entities/changePassword";

export default class UserRepositoryImpl implements UserRepository {
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
