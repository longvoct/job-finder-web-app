import React, { useEffect } from "react";
import SignInForm from "../components/form/SignInForm";
import logo from "../assets/images/logo.png";
import signInImage from "../assets/images/SignInImage.jpg";
import { useAuth } from "../contexts/auth-context";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <div className="fixed inset-0 bg-[#fff]">
      <div className="mt-[80px] shadow-xl flex w-full max-w-[1000px] h-[600px] mx-auto">
        <div className="flex-[5] bg-[#fbfbfb] flex flex-col p-10 items-center">
          <div className="mb-8 flex flex-col items-center justify-center gap-y-2">
            <img src={logo} alt="" className="w-[60px] h-full object-cover" />
            <span className="font-[500] mt-2 text-[16px]">
              Welcome to{" "}
              <span className="text-[#867eee] font-[700]">CatinDob!</span>
            </span>
          </div>
          <SignInForm></SignInForm>
        </div>
        <div className="flex-[6]">
          <img
            src={signInImage}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
