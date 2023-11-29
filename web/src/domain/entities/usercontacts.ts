export default class Usercontacts {
    FirstName: string
    LastName :string
    Email  :string
    Username : string
    NumberPhone :string

    constructor(FirstName:string,LastName:string,Email:string,Username:string,NumberPhone:string){
        this.FirstName = FirstName
        this.Email = Email
        this.LastName = LastName
        this.Username = Username
        this.NumberPhone = NumberPhone
    }
}