import React from "react";

//Public routes
import Login from "../interface/pages/login";
import ChangePassword from "../interface/pages/forgotPassword/changePassword/index.js";

//Private routes
import Chats from "../interface/pages/chats";
import {Navigate} from "react-router-dom";
import TwoFactor from "../interface/pages/twoFactor";

const authProtected = [
    {path:"/", exact:true,component: <Navigate to='/login'/>},
    {path:"/chats",component: <Chats/>},
    // {path:"/profile"}
]

const publicRoutes = [
    {path:"/login", component: <Login/>},
    {path:"/change-password",component: <ChangePassword/>},
    {path:"/two-factors",component: <TwoFactor/>}

]

export {authProtected,publicRoutes}