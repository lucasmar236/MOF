import UserRepository from "../repositories/userRepository";
import Usercontacts from "../entities/usercontacts";
import UserChats from "../entities/userChats";

export default class UsersServiceImpl {
  userRepo: UserRepository;

  constructor(ir: UserRepository) {
    this.userRepo = ir;
  }

  async GetContacts(): Promise<Usercontacts[]> {
    return this.userRepo.GetContacts();
  }

  async GetChats(): Promise<UserChats[]> {
    return this.userRepo.GetChats();
  }
  // async GetUser(): Promise<UserClass[]>{
  //     return this.userRepo.GetUser()
  // }

  async PostUserLogin(data: Object) {
    return this.userRepo.PostUserLogin(data);
  }

  async PostUserCreate(data: Object) {
    return this.userRepo.PostUserCreate(data);
  }

  async PostUserCreateCodeVerify(data: Object) {
    return this.userRepo.PostUserCreateCodeVerify(data);
  }

  async PostCodeVerify(data: Object) {
    return this.userRepo.PostCodeVerify(data);
  }
  async PostCodeVerifyChangePass(data: Object) {
    return this.userRepo.PostCodeVerifyChangePass(data);
  }

  async PutChangePassword(data: Object) {
    return this.userRepo.PutChangePassword(data);
  }
}
