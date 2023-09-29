export default class UserClass {
    name: string
    email: string
    password: string
    lastname: string
    cellphone: string

    constructor(name:string,email:string,password:string,lastname:string,cellphone:string){
        this.name = name
        this.email = email
        this.lastname = lastname
        this.password = password
        this.cellphone = cellphone
    }
}