export default class Usercontacts {
  firts_name: string;
  last_name: string;
  email: string;
  username: string;
  Nnmber_phone: string;

  constructor(
    firts_name: string,
    last_name: string,
    email: string,
    username: string,
    Nnmber_phone: string
  ) {
    this.firts_name = firts_name;
    this.email = email;
    this.last_name = last_name;
    this.username = username;
    this.Nnmber_phone = Nnmber_phone;
  }
}
