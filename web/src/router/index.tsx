import React from "react";

//Public routes
import Login from "../interface/pages/login";
import ChangePassword from "../interface/pages/forgotPassword/changePassword";

//Private routes
import Chats from "../interface/pages/chats";
import { Navigate } from "react-router-dom";
import TwoFactor from "../interface/pages/twoFactor";
import Register from "../interface/pages/register";
import Profile from "../interface/pages/profile";
import Contacts from "../interface/pages/contacts";

const authProtected = [
  { path: "/", exact: true, component: <Navigate to="/login" /> },
  { path: "/chats", component: <Chats /> },
  // {path:"/profile"}
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/change-password", component: <ChangePassword /> },
  { path: "/two-factors", component: <TwoFactor /> },
  { path: "/create-account", component: <Register /> },
  { path: "/profile", component: <Profile /> },
  { path: "/contacts", component: <Contacts /> },
  //   { path: "/chats", component: <Chats /> },
];

export { authProtected, publicRoutes };
