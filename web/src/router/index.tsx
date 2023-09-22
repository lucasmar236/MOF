import React from "react";

//Public routes
import Login from "../interface/pages/login";

//Private routes
import Chats from "../interface/pages/chats";
import {Navigate} from "react-router-dom";

const authProtected = [
    {path:"/", exact:true,component: <Navigate to='/login'/>},
    {path:"/chats",component: <Chats/>},
    // {path:"/profile"}
    // {path:"/two-factors",component: }
    // {path:"/change-password",component: }
]

const publicRoutes = [
    {path:"/login", component: <Login/>},
    // {path:"/send-email",component: }
]

export {authProtected,publicRoutes}