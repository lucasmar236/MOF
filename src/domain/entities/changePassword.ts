export default class ChangePassword{
    email:string
    newPassword:string
    newPasswordToo: string

    constructor(email:string,newPassword:string,newPasswordToo:string){
        this.email = email
        this.newPassword = newPassword
        this.newPasswordToo = newPasswordToo
    }
}