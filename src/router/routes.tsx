import {Navigate} from "react-router-dom";
import PrivateLayout from "../interface/utils/layouts/privateLayout";

const VerifyAuth = (props: { location: string; children: object; }) => {
    if(!localStorage.getItem("auth")){
        return(
            <Navigate to="/login" state ={{from : props.location }}/>
        )
    }
    return (
        <>
            <PrivateLayout data={{username:localStorage.getItem("userName")}}>
                {props.children}
            </PrivateLayout>
        </>
    )
}

export default VerifyAuth