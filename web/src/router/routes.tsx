import {Navigate} from "react-router-dom";
import PublicLayout from "../interface/utils/layouts/publicLayout";

const VerifyAuth = (props: { location: string; children: object; }) => {
    if(!localStorage.getItem("authUser")){
        return(
            <Navigate to="/login" state ={{from : props.location }}/>
        )
    }
    return (
        <>
            <PublicLayout>
                {props.children}
            </PublicLayout>
        </>
    )
}

export default VerifyAuth