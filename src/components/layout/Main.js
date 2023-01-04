import { signOut } from "firebase/auth";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { auth } from "../../firebase-app/firebase-config";
import Header from "./Header";

const Main = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const handleSignOut = () => {
    signOut(auth);
  };

  if (!userInfo) navigate("/login");
  return (
    <div className="">
      <Header userInfo={userInfo} signOut={handleSignOut}></Header>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
