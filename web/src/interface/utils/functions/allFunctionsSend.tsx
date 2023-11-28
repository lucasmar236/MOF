import {useAppDispatch} from "../../../services/hooks";
import {requestLogin} from "../../../services/redux/authentication/userSlice";

export const SendLogin = (email_User:string,password:string) =>{

    const dispatch = useAppDispatch()

    let userLogin = {
        email_username: email_User,
        password:password
    }
    dispatch(requestLogin(userLogin))
}

export const verifyInputs = (event:any) => {
    event.preventDefault();
    event.stopPropagation();
}