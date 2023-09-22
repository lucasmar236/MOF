import {Navigate} from "react-router-dom";

const VerifyAuth = (props: { location: string; children: object; }) => {
    console.log(props.location)
    if(!localStorage.getItem("authUser")){
        return(
            <Navigate to="/login" state ={{from : props.location }}/>
        )
    }
    return (
        <>
            {props.children}
        </>
    )
}

export default VerifyAuth